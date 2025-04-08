package com.prj.nosql.controller;

import com.prj.nosql.dto.UpdateUserRequest;
import com.prj.nosql.dto.UserResponse;
import com.prj.nosql.model.User;
import com.prj.nosql.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/professeur")
public class ProfesseurController {

    @Autowired
    private AuthService authService;

    @GetMapping("/edit-profile")
    public ResponseEntity<UserResponse> getMonProfil(Authentication authentication) {
        User prof = (User) authentication.getPrincipal();
        return ResponseEntity.ok(authService.getUserById(prof.getId()));
    }

    @PutMapping("/edit-profile")
    public ResponseEntity<UserResponse> modifierMonProfil(
            @RequestBody UpdateUserRequest request,
            Authentication authentication
    ) {
        User prof = (User) authentication.getPrincipal();
        UserResponse updated = authService.updateUser(prof.getId(), request);
        return ResponseEntity.ok(updated);
    }
}
