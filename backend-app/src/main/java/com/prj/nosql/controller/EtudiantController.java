package com.prj.nosql.controller;


import com.prj.nosql.dto.AbsenceEtudiantDto;
import com.prj.nosql.dto.JustificationRequest;
import com.prj.nosql.dto.UpdateUserRequest;
import com.prj.nosql.model.User;
import com.prj.nosql.service.AbsenceService;
import com.prj.nosql.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/etudiant")
public class EtudiantController {


    @Autowired
    private AbsenceService absenceService;
    @Autowired
    private AuthService authService;

    @GetMapping("/absences")
    public ResponseEntity<List<AbsenceEtudiantDto>> voirMesAbsences(Authentication auth) {
        User etudiant = (User) auth.getPrincipal();
        return ResponseEntity.ok(absenceService.getAbsencesByEtudiant(etudiant.getId()));
    }

    @PutMapping("/absences/{absenceId}/justification")
    public ResponseEntity<String> ajouterJustification(
            @PathVariable String absenceId,
            @ModelAttribute JustificationRequest request,
            Authentication auth) {

        User etudiant = (User) auth.getPrincipal();
        absenceService.ajouterOuModifierJustification(absenceId, request, etudiant.getId());
        return ResponseEntity.ok("Justification soumise.");
    }
    // 🆕 Get pour récupérer les infos du profil
    @GetMapping("/edit-profile")
    public ResponseEntity<UpdateUserRequest> getProfile(Authentication auth) {
        User etudiant = (User) auth.getPrincipal();

        UpdateUserRequest response = new UpdateUserRequest();
        response.setNom(etudiant.getNom());
        response.setPrenom(etudiant.getPrenom());
        response.setUsername(etudiant.getUsername());
        response.setEmail(etudiant.getEmail());
        response.setRole(etudiant.getRole());
        response.setPasswordChanged(etudiant.isPasswordChanged());
        // pas de mot de passe retourné bien sûr

        return ResponseEntity.ok(response);
    }

    // 🆕 Put pour mettre à jour les infos
    @PutMapping("/edit-profile")
    public ResponseEntity<String> updateProfile(@RequestBody UpdateUserRequest request, Authentication auth) {
        User etudiant = (User) auth.getPrincipal();
        authService.updateUser(etudiant.getId(), request);
        return ResponseEntity.ok("Profil mis à jour avec succès.");
    }
}
