package com.prj.nosql.controller;


import com.prj.nosql.dto.CreateUserRequest;
import com.prj.nosql.dto.UpdateUserRequest;
import com.prj.nosql.dto.UserResponse;
import com.prj.nosql.model.UserRole;
import com.prj.nosql.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private AuthService authService;
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    public AdminController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/users")
    public ResponseEntity<UserResponse> createUser(@RequestBody CreateUserRequest request) {
        try {
            UserResponse response = authService.createUser(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        try {
            List<UserResponse> users = authService.getAllUsersWithPasswords();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            logger.error("Error fetching users", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(authService.getUserById(id));
    }
    // 🔁 1. Ajouter un utilisateur (spécifique à un rôle)
    @PostMapping("/{role}")
    public ResponseEntity<UserResponse> createUserByRole(
            @PathVariable String role,
            @RequestBody CreateUserRequest request
    ) {
        try {
            UserRole userRole = UserRole.valueOf(role.toUpperCase());
            request.setRole(userRole); // Assigner le rôle explicitement
            UserResponse response = authService.createUser(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build(); // Rôle invalide
        } catch (Exception e) {
            logger.error("Error creating user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 🔁 2. Liste des utilisateurs par rôle
    @GetMapping("/{role}")
    public ResponseEntity<List<UserResponse>> getUsersByRole(@PathVariable String role) {
        try {
            UserRole userRole = UserRole.valueOf(role.toUpperCase());
            List<UserResponse> users = authService.getUsersByRole(userRole);
            return ResponseEntity.ok(users);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            logger.error("Error fetching users by role", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    // 🔁 4. Modifier un utilisateur
    @PutMapping("/users/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable String id,
            @RequestBody UpdateUserRequest request
    ) {
        try {
            UserResponse updatedUser = authService.updateUser(id, request);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            logger.error("Error updating user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/users/{id}/change-password")
    public ResponseEntity<?> adminChangePassword(@PathVariable String id, @RequestBody String newPassword) {
        authService.adminChangePassword(id, newPassword);
        return ResponseEntity.ok().build();
    }
}