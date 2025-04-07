package com.prj.nosql.dto;

import com.prj.nosql.model.Absence;
import com.prj.nosql.model.Absence.JustificationStatut;
import lombok.Data;

@Data
public class AbsenceDto {
    private String etudiantId;
    private boolean justifie;
    private String justificationText;
    private String justificationDocumentPath;
    private JustificationStatut justificationStatut;
    public static AbsenceDto fromEntity(Absence absence) {
        AbsenceDto dto = new AbsenceDto();
        dto.setEtudiantId(absence.getEtudiantId());
        dto.setJustifie(absence.isJustifie());
        dto.setJustificationText(absence.getJustificationText());
        dto.setJustificationDocumentPath(absence.getJustificationDocumentPath());
        dto.setJustificationStatut(absence.getJustificationStatut());
        return dto;
    }
}

