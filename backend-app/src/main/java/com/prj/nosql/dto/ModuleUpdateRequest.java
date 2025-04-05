package com.prj.nosql.dto;

import lombok.Data;

@Data
public class ModuleUpdateRequest {
    private String titre;
    private String description;
    private String classeId;  // Optionnel - si null, ne pas modifier
    private String professeurId;  // Optionnel - si null, ne pas modifier
}
