package com.prj.nosql.controller;


import com.prj.nosql.dto.AbsenceEtudiantDto;
import com.prj.nosql.dto.JustificationRequest;
import com.prj.nosql.model.User;
import com.prj.nosql.service.AbsenceService;
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
}
