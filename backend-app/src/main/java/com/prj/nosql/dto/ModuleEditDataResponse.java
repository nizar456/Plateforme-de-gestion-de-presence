package com.prj.nosql.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModuleEditDataResponse {
    private ModuleUpdateRequest currentModuleData;
    private List<ClasseDto> classes;
    private List<ProfesseurDto> professeurs;
}