package com.prj.nosql.dto;

import lombok.Data;

@Data
public class AffectationModuleRequest {
    private String moduleId;
    private String classeId;
    private String professeurId;
}
