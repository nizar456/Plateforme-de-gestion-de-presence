package com.prj.nosql.service;

import com.prj.nosql.dto.AbsenceEtudiantDto;
import com.prj.nosql.dto.JustificationRequest;
import com.prj.nosql.dto.JustificationResponseDto;
import com.prj.nosql.model.Absence;
import com.prj.nosql.model.Module;
import com.prj.nosql.model.FeuillePresence;
import com.prj.nosql.model.User;
import com.prj.nosql.repository.AbsenceRepository;
import com.prj.nosql.repository.FeuillePresenceRepository;
import com.prj.nosql.repository.ModuleRepository;
import com.prj.nosql.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class AbsenceServiceImpl implements AbsenceService{
    @Autowired
    private AbsenceRepository absenceRepo;
    @Autowired
    private FeuillePresenceRepository feuilleRepo;
    @Autowired
    private ModuleRepository moduleRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private MailService mailService;

    @Override
    public List<AbsenceEtudiantDto> getAbsencesByEtudiant(String etudiantId) {
        List<Absence> absences = absenceRepo.findByEtudiantId(etudiantId);
        return absences.stream().map(abs -> {
            FeuillePresence feuille = feuilleRepo.findById(abs.getFeuillePresenceId()).orElse(null);
            if (feuille == null) return null;

            Module module = moduleRepo.findById(feuille.getModuleId()).orElse(null);
            if (module == null) return null;

            User prof = userRepo.findById(module.getProfesseurId()).orElse(null);
            if (prof == null) return null;

            return AbsenceEtudiantDto.from(abs, module.getTitre(), prof.getNom(), prof.getPrenom(),
                    feuille.getDateSeance().toString(), feuille.getDureeHeures());
        }).filter(Objects::nonNull).toList();
    }

    @Override
    public void ajouterOuModifierJustification(String absenceId, JustificationRequest request, String etudiantId) {
        Absence absence = absenceRepo.findById(absenceId)
                .orElseThrow(() -> new RuntimeException("Absence non trouvée"));

        if (!absence.getEtudiantId().equals(etudiantId)) {
            throw new RuntimeException("Non autorisé");
        }

        if (absence.getJustificationStatut() != Absence.JustificationStatut.EN_ATTENTE) {
            throw new RuntimeException("Justification déjà traitée");
        }

        absence.setJustificationText(request.getJustificationText());
        absence.setJustifie(true);

        // upload du fichier avec try-catch
        if (request.getFile() != null && !request.getFile().isEmpty()) {
            try {
                String fileName = UUID.randomUUID() + "_" + request.getFile().getOriginalFilename();
                String baseDir = System.getProperty("user.dir") + "/justifications"; // crée dans racine du projet backend
                Path uploadPath = Paths.get(baseDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath); // ← Cette ligne assure que le dossier est créé
                }
                Path filePath = uploadPath.resolve(fileName);
                request.getFile().transferTo(filePath.toFile()); // peut lancer IOException
                absence.setJustificationDocumentPath(filePath.toString());
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("Erreur lors du téléchargement du fichier", e);
            }
        }

        absenceRepo.save(absence);
        // Envoi d’email au professeur si email présent
        try {
            // Récupération des infos
            User etudiant = userRepo.findById(etudiantId)
                    .orElseThrow(() -> new RuntimeException("Étudiant non trouvé"));

            FeuillePresence feuille = feuilleRepo.findById(absence.getFeuillePresenceId())
                    .orElseThrow(() -> new RuntimeException("Feuille de présence non trouvée"));

            Module module = moduleRepo.findById(feuille.getModuleId())
                    .orElseThrow(() -> new RuntimeException("Module non trouvé"));

            User professeur = userRepo.findById(module.getProfesseurId())
                    .orElseThrow(() -> new RuntimeException("Professeur non trouvé"));

            String emailProf = professeur.getEmail();
            if (emailProf != null && !emailProf.isBlank()) {
                mailService.envoyerMailJustificationAuProf(
                        emailProf,
                        etudiant.getNom(),
                        etudiant.getPrenom(),
                        module.getTitre(),
                        feuille.getDateSeance()
                );
            }

        } catch (Exception e) {
            System.err.println("Erreur lors de l'envoi du mail au professeur : " + e.getMessage());
            e.printStackTrace();
        }
    }
    @Override
    public List<JustificationResponseDto> getJustificationsEnAttente(String professeurId) {
        List<Module> modules = moduleRepo.findByProfesseurId(professeurId);
        List<String> moduleIds = modules.stream().map(Module::getId).toList();
        List<FeuillePresence> feuilles = feuilleRepo.findByModuleIdIn(moduleIds);
        List<String> feuilleIds = feuilles.stream().map(FeuillePresence::getId).toList();

        List<Absence> absences = absenceRepo.findByFeuillePresenceIdInAndJustificationStatut(feuilleIds, Absence.JustificationStatut.EN_ATTENTE);

        return absences.stream().filter(Absence::isJustifie).map(abs -> {
            User etudiant = userRepo.findById(abs.getEtudiantId()).orElse(null);
            FeuillePresence feuille = feuilleRepo.findById(abs.getFeuillePresenceId()).orElse(null);
            Module module = moduleRepo.findById(feuille.getModuleId()).orElse(null);
            return new JustificationResponseDto(
                    abs.getId(),
                    etudiant.getNom(),
                    etudiant.getPrenom(),
                    module.getTitre(),
                    feuille.getDateSeance().toString(),
                    abs.getJustificationText(),
                    abs.getJustificationDocumentPath(),
                    abs.getJustificationStatut().name()
            );
        }).toList();
    }

    @Override
    public void updateStatutJustification(String absenceId, String statut, String professeurId) {
        Absence absence = absenceRepo.findById(absenceId)
                .orElseThrow(() -> new RuntimeException("Absence non trouvée"));
        FeuillePresence feuille = feuilleRepo.findById(absence.getFeuillePresenceId())
                .orElseThrow(() -> new RuntimeException("Feuille non trouvée"));
        Module module = moduleRepo.findById(feuille.getModuleId())
                .orElseThrow(() -> new RuntimeException("Module non trouvé"));

        if (!module.getProfesseurId().equals(professeurId)) {
            throw new RuntimeException("Non autorisé");
        }

        Absence.JustificationStatut newStatut = Absence.JustificationStatut.valueOf(statut);
        absence.setJustificationStatut(newStatut);
        absenceRepo.save(absence);
    }

}
