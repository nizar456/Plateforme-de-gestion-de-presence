package com.prj.nosql.controller;

import com.prj.nosql.dto.*;
import com.prj.nosql.model.Absence;
import com.prj.nosql.model.FeuillePresence;
import com.prj.nosql.model.Module;
import com.prj.nosql.model.User;
import com.prj.nosql.service.FeuillePresenceService;
import com.prj.nosql.service.ModuleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ModuleController {

    @Autowired
    private ModuleService moduleService;
    private final FeuillePresenceService feuillePresenceService;

    public ModuleController(FeuillePresenceService feuillePresenceService) {
        this.feuillePresenceService = feuillePresenceService;
    }

    @PostMapping("/admin/modules")
    public ResponseEntity<ModuleResponse> createModule(@RequestBody ModuleCreateRequest request) {
        return ResponseEntity.ok(moduleService.createModule(request));
    }

    @GetMapping("/admin/modules")
    public ResponseEntity<List<ModuleResponse>> getAllModules() {
        return ResponseEntity.ok(moduleService.getAllModules());
    }

    @GetMapping("/admin/modules/{id}")
    public ResponseEntity<ModuleResponse> getModuleById(@PathVariable String id) {
        return ResponseEntity.ok(moduleService.getModuleById(id));
    }

    @PutMapping("/admin/modules/{id}")
    public ResponseEntity<ModuleResponse> updateModule(
            @PathVariable String id,
            @RequestBody ModuleUpdateRequest request) {
        return ResponseEntity.ok(moduleService.updateModule(id, request));
    }

        @DeleteMapping("/admin/modules/{id}")
    public ResponseEntity<Void> deleteModule(@PathVariable String id) {
        moduleService.deleteModule(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/admin/modules/affecter")
    public ResponseEntity<ModuleResponse> affecterModule(@RequestBody AffectationModuleRequest request) {
        return ResponseEntity.ok(moduleService.affecterModule(request));
    }
    @GetMapping("/professor/modules")
    public ResponseEntity<List<Module>> getModulesEnseignes(Authentication auth) {
        User principal = (User) auth.getPrincipal();
        // Cast vers votre classe User
        String professeurId = principal.getId();
        return ResponseEntity.ok(moduleService.getModulesByProfesseur(professeurId));
    }
    // hna bach idir lpresence
    @GetMapping("/professor/modules/{moduleId}/feuille-presence")
    public ResponseEntity<FeuillePresencePreparationDto> getEtudiantsPourFeuille(@PathVariable String moduleId) {
        return ResponseEntity.ok(feuillePresenceService.getEtudiantsDuModule(moduleId));
    }
    @PostMapping("/professor/modules/{moduleId}/feuille-presence")
    public ResponseEntity<FeuillePresenceDetailsDto> creerFeuillePresence(
            @PathVariable String moduleId,
            @Valid @RequestBody FeuillePresenceCreateRequest request,
            Authentication auth) {

        User professeur = (User) auth.getPrincipal();
        return ResponseEntity.ok(feuillePresenceService.creerFeuillePresence(moduleId, professeur.getId(), request));
    }
    //3andak feuilles avec s hna
    @GetMapping("/professor/modules/{moduleId}/feuilles-presence")
    public ResponseEntity<List<FeuillePresenceDetailsDto>> getFeuillesPresenceParModule(
            @PathVariable String moduleId, Authentication auth) {

        User professeur = (User) auth.getPrincipal();
        return ResponseEntity.ok(feuillePresenceService.getFeuillesByModuleAndProfesseur(moduleId, professeur.getId()));
    }
    @GetMapping("/professor/modules/{moduleId}/feuilles-presence/{id}")
    public ResponseEntity<FeuillePresenceDetailsDto> getDetailsFeuillePresence(@PathVariable String id) {
        return ResponseEntity.ok(feuillePresenceService.getDetailsFeuillePresence(id));
    }
    @PutMapping("/professor/modules/{moduleId}/feuilles-presence/{id}")
    public ResponseEntity<FeuillePresenceDetailsDto> modifierFeuillePresence(
            @PathVariable String moduleId,
            @PathVariable String id,
            @RequestBody FeuillePresenceUpdateRequest request) {
        return ResponseEntity.ok(feuillePresenceService.modifierFeuille(moduleId, id, request));
    }
    @DeleteMapping("/professor/modules/{moduleId}/feuilles-presence/{id}")
    public ResponseEntity<Void> supprimerFeuillePresence(@PathVariable String moduleId, @PathVariable String id) {
        feuillePresenceService.supprimerFeuillePresence(id);
        return ResponseEntity.noContent().build();
    }

}
