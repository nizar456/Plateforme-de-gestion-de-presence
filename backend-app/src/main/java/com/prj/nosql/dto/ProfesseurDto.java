package com.prj.nosql.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfesseurDto {
    private String id;
    private String nom;
    private String prenom;
}