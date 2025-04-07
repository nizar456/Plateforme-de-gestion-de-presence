package com.prj.nosql.controller;

import com.prj.nosql.dto.*;
import com.prj.nosql.model.User;
import com.prj.nosql.service.ClasseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/classes")
public class ClasseController {

    @Autowired
    private ClasseService classeService;

    @PostMapping
    public ResponseEntity<ClasseResponse> createClasse(@RequestBody ClasseCreateRequest request) {
        return ResponseEntity.ok(classeService.createClasse(request));
    }

    @GetMapping
    public ResponseEntity<List<ClasseResponse>> getAllClasses() {
        return ResponseEntity.ok(classeService.getAllClasses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClasseResponse> getClasseById(@PathVariable String id) {
        return ResponseEntity.ok(classeService.getClasseById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClasseResponse> updateClasse(@PathVariable String id, @RequestBody ClasseCreateRequest request) {
        return ResponseEntity.ok(classeService.updateClasse(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClasse(@PathVariable String id) {
        classeService.deleteClasse(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/affecter-etudiant")
    public ResponseEntity<ClasseResponse> affecterEtudiant(@RequestBody AffectationEtudiantRequest request) {
        return ResponseEntity.ok(classeService.affecterEtudiant(request));
    }
    @GetMapping("/{id}/affecter-etudiant")
    public ResponseEntity<List<SimpleUserResponse>> getEtudiantsSansClasse() {
        List<User> etudiants = classeService.getEtudiantsSansClasse();
        // Mapper les entités User vers des DTOs si tu veux éviter d'exposer tout
        List<SimpleUserResponse> response = etudiants.stream()
                .map(user -> new SimpleUserResponse(user.getId(), user.getFullName(), user.getEmail()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
}