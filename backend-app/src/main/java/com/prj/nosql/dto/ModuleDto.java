package com.prj.nosql.dto;

import com.prj.nosql.model.Module;
import lombok.Data;

@Data
public class ModuleDto {
    private String id;
    private String titre;
    private String description;
    public static ModuleDto fromEntity(Module module) {
        ModuleDto dto = new ModuleDto();
        dto.setId(module.getId());
        dto.setTitre(module.getTitre());
        dto.setDescription(module.getDescription());
        return dto;
    }
}
