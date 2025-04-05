package com.prj.nosql.dto;

import lombok.Data;

@Data
public class ModuleResponse {
    private String id;
    private String titre;
    private String description;
    private ClasseSimpleResponse classe;
    private ProfesseurSimpleResponse professeur;
}
