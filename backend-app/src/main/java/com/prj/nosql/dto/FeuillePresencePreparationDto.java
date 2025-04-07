package com.prj.nosql.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeuillePresencePreparationDto {
    private String moduleId;
    private String moduleTitre;
    private String classeId;
    private String classeNom;
    private List<EtudiantInfoDto> etudiants;
}
