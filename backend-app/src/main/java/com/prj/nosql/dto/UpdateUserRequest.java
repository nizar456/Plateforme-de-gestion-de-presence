package com.prj.nosql.dto;

import com.prj.nosql.model.UserRole;
import lombok.Data;

@Data
public class UpdateUserRequest {
    private String nom;
    private String prenom;
    private String username;
    private UserRole role;
    private boolean passwordChanged;
    private String plainPassword;
}
