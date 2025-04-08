package com.prj.nosql.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JustificationResponseDto {
    private String absenceId;
    private String nomEtudiant;
    private String prenomEtudiant;
    private String moduleTitre;
    private String dateSeance;
    private String justificationText;
    private String justificationDocumentPath;
    private String statut;
}
