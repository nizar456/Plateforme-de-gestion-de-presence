package com.prj.nosql.controller;

import com.prj.nosql.dto.*;
import com.prj.nosql.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/modules")
public class ModuleController {

    @Autowired
    private ModuleService moduleService;

    @PostMapping
    public ResponseEntity<ModuleResponse> createModule(@RequestBody ModuleCreateRequest request) {
        return ResponseEntity.ok(moduleService.createModule(request));
    }

    @GetMapping
    public ResponseEntity<List<ModuleResponse>> getAllModules() {
        return ResponseEntity.ok(moduleService.getAllModules());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModuleResponse> getModuleById(@PathVariable String id) {
        return ResponseEntity.ok(moduleService.getModuleById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModuleResponse> updateModule(
            @PathVariable String id,
            @RequestBody ModuleUpdateRequest request) {
        return ResponseEntity.ok(moduleService.updateModule(id, request));
    }
    
        @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModule(@PathVariable String id) {
        moduleService.deleteModule(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/affecter")
    public ResponseEntity<ModuleResponse> affecterModule(@RequestBody AffectationModuleRequest request) {
        return ResponseEntity.ok(moduleService.affecterModule(request));
    }
}
