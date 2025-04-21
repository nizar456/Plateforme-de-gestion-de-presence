package com.prj.nosql.service;

import com.prj.nosql.dto.*;
import com.prj.nosql.model.*;
import com.prj.nosql.model.Module;
import com.prj.nosql.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ModuleService {

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private ClasseRepository classeRepository;

    @Autowired
    private UserRepository userRepository;

    public ModuleResponse createModule(ModuleCreateRequest request) {
        // Vérifier que la classe existe
        Classe classe = classeRepository.findById(request.getClasseId())
                .orElseThrow(() -> new RuntimeException("Classe non trouvée"));

        // Vérifier que le professeur existe et est bien un professeur
        User professeur = userRepository.findById(request.getProfesseurId())
                .filter(u -> u.getRole() == UserRole.PROFESSOR)
                .orElseThrow(() -> new RuntimeException("Professeur non trouvé ou invalide"));

        Module module = new Module();
        module.setTitre(request.getTitre());
        module.setDescription(request.getDescription());
        module.setClasseId(classe.getId());
        module.setProfesseurId(professeur.getId());

        Module saved = moduleRepository.save(module);
        return convertToResponse(saved);
    }

    public List<ModuleResponse> getAllModules() {
        return moduleRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public ModuleResponse getModuleById(String id) {
        return moduleRepository.findById(id)
                .map(this::convertToResponse)
                .orElseThrow(() -> new RuntimeException("Module non trouvé"));
    }

    public ModuleResponse updateModule(String id, ModuleUpdateRequest request) {
        Module module = moduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Module non trouvé"));

        // Vérifier si la classe a changé
        if (request.getClasseId() != null && !request.getClasseId().equals(module.getClasseId())) {
            Classe nouvelleClasse = classeRepository.findById(request.getClasseId())
                    .orElseThrow(() -> new RuntimeException("Nouvelle classe non trouvée"));
            module.setClasseId(nouvelleClasse.getId());
        }

        // Vérifier si le professeur a changé
        if (request.getProfesseurId() != null && !request.getProfesseurId().equals(module.getProfesseurId())) {
            User nouveauProfesseur = userRepository.findById(request.getProfesseurId())
                    .filter(u -> u.getRole() == UserRole.PROFESSOR)
                    .orElseThrow(() -> new RuntimeException("Nouveau professeur non trouvé ou invalide"));
            module.setProfesseurId(nouveauProfesseur.getId());
        }

        // Mettre à jour les autres champs
        if (request.getTitre() != null) {
            module.setTitre(request.getTitre());
        }

        if (request.getDescription() != null) {
            module.setDescription(request.getDescription());
        }

        Module updated = moduleRepository.save(module);
        return convertToResponse(updated);
    }

    public void deleteModule(String id) {
        moduleRepository.deleteById(id);
    }

    public ModuleResponse affecterModule(AffectationModuleRequest request) {
        Module module = moduleRepository.findById(request.getModuleId())
                .orElseThrow(() -> new RuntimeException("Module non trouvé"));

        Classe classe = classeRepository.findById(request.getClasseId())
                .orElseThrow(() -> new RuntimeException("Classe non trouvée"));

        User professeur = userRepository.findById(request.getProfesseurId())
                .filter(u -> u.getRole() == UserRole.PROFESSOR)
                .orElseThrow(() -> new RuntimeException("Professeur non trouvé ou invalide"));

        module.setClasseId(classe.getId());
        module.setProfesseurId(professeur.getId());

        Module updated = moduleRepository.save(module);
        return convertToResponse(updated);
    }

    private ModuleResponse convertToResponse(Module module) {
        ModuleResponse response = new ModuleResponse();
        response.setId(module.getId());
        response.setTitre(module.getTitre());
        response.setDescription(module.getDescription());

        // Récupérer les infos de la classe
        classeRepository.findById(module.getClasseId()).ifPresent(classe -> {
            ClasseSimpleResponse csr = new ClasseSimpleResponse();
            csr.setId(classe.getId());
            csr.setNom(classe.getNom());
            csr.setNiveau(classe.getNiveau().toString());
            response.setClasse(csr);
        });

        // Récupérer les infos du professeur
        userRepository.findById(module.getProfesseurId()).ifPresent(prof -> {
            ProfesseurSimpleResponse psr = new ProfesseurSimpleResponse();
            psr.setId(prof.getId());
            psr.setNom(prof.getNom());
            psr.setPrenom(prof.getPrenom());
            response.setProfesseur(psr);
        });

        return response;
    }
    public List<ModuleWithClasseResponse> getModulesWithClasseByProfesseur(String professeurId) {
        List<Module> modules = moduleRepository.findByProfesseurId(professeurId);
        return modules.stream().map(module -> {
            Classe classe = classeRepository.findById(module.getClasseId())
                    .orElse(null); // ou tu peux gérer le cas non trouvé avec exception si nécessaire
            return new ModuleWithClasseResponse(
                    module.getId(),
                    module.getTitre(),
                    module.getDescription(),
                    classe
            );
        }).collect(Collectors.toList());
    }
    public ModuleCreationDataResponse getModuleCreationData() {
        List<ClasseDto> classes = classeRepository.findAll().stream()
                .map(c -> new ClasseDto(c.getId(), c.getNom(),c.getNiveau()))
                .toList();

        List<ProfesseurDto> profs = userRepository.findByRole(UserRole.PROFESSOR).stream()
                .map(p -> new ProfesseurDto(p.getId(), p.getNom(), p.getPrenom()))
                .toList();

        return new ModuleCreationDataResponse(classes, profs);
    }
    public ModuleEditDataResponse getModuleEditData(String moduleId) {
        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module non trouvé"));

        ModuleUpdateRequest currentData = new ModuleUpdateRequest();
        currentData.setTitre(module.getTitre());
        currentData.setDescription(module.getDescription());
        currentData.setClasseId(module.getClasseId());
        currentData.setProfesseurId(module.getProfesseurId());

        List<ClasseDto> classes = classeRepository.findAll().stream()
                .map(c -> new ClasseDto(c.getId(), c.getNom(),c.getNiveau()))
                .toList();

        List<ProfesseurDto> professeurs = userRepository.findByRole(UserRole.PROFESSOR).stream()
                .map(p -> new ProfesseurDto(p.getId(), p.getNom(), p.getPrenom()))
                .toList();

        return new ModuleEditDataResponse(currentData, classes, professeurs);
    }
}