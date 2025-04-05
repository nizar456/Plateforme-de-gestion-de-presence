package com.prj.nosql.dto;

import lombok.Data;

@Data
public class ModuleCreateRequest {
    private String titre;
    private String description;
    private String classeId;
    private String professeurId;
}
