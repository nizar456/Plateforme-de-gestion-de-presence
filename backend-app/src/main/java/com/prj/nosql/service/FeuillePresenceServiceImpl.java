package com.prj.nosql.service;

import com.prj.nosql.dto.*;
import com.prj.nosql.model.*;
import com.prj.nosql.model.Module;
import com.prj.nosql.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class FeuillePresenceServiceImpl implements FeuillePresenceService {

    @Autowired
    private FeuillePresenceRepository feuilleRepo;
    @Autowired
    private ModuleRepository moduleRepo;
    @Autowired
    private AbsenceRepository absenceRepo;

    @Autowired
    private ClasseRepository classeRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public FeuillePresenceDetailsDto creerFeuillePresence(String moduleId, String professeurId, FeuillePresenceCreateRequest request) {
        Module module = moduleRepo.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module non trouvé"));

        if (!module.getProfesseurId().equals(professeurId)) {
            throw new RuntimeException("Non autorisé à créer une feuille pour ce module.");
        }

        FeuillePresence newFeuille = new FeuillePresence();
        newFeuille.setModuleId(moduleId);
        newFeuille.setDateSeance(request.getDateSeance());
        newFeuille.setDureeHeures(request.getDureeHeures());
        newFeuille.setCreatedAt(new Date());

        FeuillePresence savedFeuille = feuilleRepo.save(newFeuille); // ✅ nouvelle variable, jamais réassignée

        List<Absence> absences = request.getAbsentsIds().stream().map(id -> {
            Absence a = new Absence();
            a.setFeuillePresenceId(savedFeuille.getId());  // ✅ plus de souci
            a.setEtudiantId(id);
            a.setJustifie(false);
            a.setJustificationStatut(Absence.JustificationStatut.EN_ATTENTE);
            return a;
        }).toList();

        absenceRepo.saveAll(absences);

        // DTO
        FeuillePresenceDetailsDto dto = new FeuillePresenceDetailsDto();
        dto.setId(newFeuille.getId());
        dto.setModuleId(moduleId);
        dto.setDateSeance(newFeuille.getDateSeance());
        dto.setDureeHeures(newFeuille.getDureeHeures());
        dto.setCreatedAt(newFeuille.getCreatedAt());
        dto.setAbsences(absences.stream().map(this::toDto).toList());

        return dto;
    }

    @Override
    public List<FeuillePresenceDetailsDto> getFeuillesByModuleAndProfesseur(String moduleId, String professeurId) {
        Module module = moduleRepo.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module non trouvé"));

        if (!module.getProfesseurId().equals(professeurId)) {
            throw new RuntimeException("Non autorisé");
        }

        List<FeuillePresence> feuilles = feuilleRepo.findByModuleId(moduleId);
        return feuilles.stream().map(f -> {
            List<Absence> absences = absenceRepo.findByFeuillePresenceId(f.getId());
            return toDetailsDto(f, absences);
        }).toList();
    }

    @Override
    public FeuillePresenceDetailsDto getDetailsFeuillePresence(String feuilleId) {
        FeuillePresence feuille = feuilleRepo.findById(feuilleId)
                .orElseThrow(() -> new RuntimeException("Feuille non trouvée"));

        List<Absence> absences = absenceRepo.findByFeuillePresenceIdAndJustificationStatutIn(
                feuilleId, List.of(Absence.JustificationStatut.EN_ATTENTE, Absence.JustificationStatut.REFUSEE));

        return toDetailsDto(feuille, absences);
    }

    private FeuillePresenceDetailsDto toDetailsDto(FeuillePresence feuille, List<Absence> absences) {
        FeuillePresenceDetailsDto dto = new FeuillePresenceDetailsDto();
        dto.setId(feuille.getId());
        dto.setModuleId(feuille.getModuleId());
        dto.setDateSeance(feuille.getDateSeance());
        dto.setDureeHeures(feuille.getDureeHeures());
        dto.setCreatedAt(feuille.getCreatedAt());
        dto.setAbsences(absences.stream().map(this::toDto).toList());
        return dto;
    }

    private AbsenceDto toDto(Absence a) {
        AbsenceDto dto = new AbsenceDto();
        dto.setEtudiantId(a.getEtudiantId());
        dto.setJustifie(a.isJustifie());
        dto.setJustificationText(a.getJustificationText());
        dto.setJustificationStatut(a.getJustificationStatut());
        return dto;
    }
    public FeuillePresencePreparationDto getEtudiantsDuModule(String moduleId) {
        Module module = moduleRepo.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module non trouvé"));

        Classe classe = classeRepo.findById(module.getClasseId())
                .orElseThrow(() -> new RuntimeException("Classe non trouvée"));

        List<User> etudiants = userRepo.findAllById(classe.getEtudiantIds());
        List<EtudiantInfoDto> etudiantDtos = etudiants.stream()
                .map(e -> new EtudiantInfoDto(e.getId(), e.getNom(), e.getPrenom()))
                .toList();

        return new FeuillePresencePreparationDto(
                module.getId(),
                module.getTitre(),
                classe.getId(),
                classe.getNom(),
                etudiantDtos
        );
    }
    public FeuillePresenceDetailsDto modifierFeuille(String moduleId, String feuilleId, FeuillePresenceUpdateRequest request) {
        FeuillePresence feuille = feuilleRepo.findById(feuilleId)
                .orElseThrow(() -> new RuntimeException("Feuille non trouvée"));

        feuille.setDateSeance(request.getDateSeance());
        feuille.setDureeHeures(request.getDureeHeures());
        feuilleRepo.save(feuille);

        // Supprimer les anciennes absences
        absenceRepo.deleteByFeuillePresenceId(feuilleId);

        // Ajouter les nouvelles
        List<Absence> absences = request.getAbsentsIds().stream().map(id -> {
            Absence a = new Absence();
            a.setFeuillePresenceId(feuilleId);
            a.setEtudiantId(id);
            a.setJustifie(false);
            a.setJustificationStatut(Absence.JustificationStatut.EN_ATTENTE);
            return a;
        }).toList();
        absenceRepo.saveAll(absences);

        feuille.setAbsences(absences);
        return FeuillePresenceDetailsDto.fromEntity(feuille, absences); // méthode que tu as déjà
    }
    public void supprimerFeuillePresence(String feuilleId) {
        // Supprimer les absences associées d'abord
        absenceRepo.deleteByFeuillePresenceId(feuilleId);
        // Ensuite supprimer la feuille elle-même
        feuilleRepo.deleteById(feuilleId);
    }
}

