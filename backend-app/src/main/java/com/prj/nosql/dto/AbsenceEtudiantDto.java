package com.prj.nosql.dto;

import com.prj.nosql.model.Absence;
import lombok.Data;

@Data
public class AbsenceEtudiantDto {
    private String absenceId;
    private String moduleNom;
    private String professeurNom;
    private String professeurPrenom;
    private String justificationText;
    private String justificationDocumentPath;
    private Absence.JustificationStatut justificationStatut;
    private String dateSeance;
    private double dureeHeures;

    public static AbsenceEtudiantDto from(
            Absence absence, String moduleNom, String profNom, String profPrenom, String date, double duree
    ) {
        AbsenceEtudiantDto dto = new AbsenceEtudiantDto();
        dto.setAbsenceId(absence.getId());
        dto.setModuleNom(moduleNom);
        dto.setProfesseurNom(profNom);
        dto.setProfesseurPrenom(profPrenom);
        dto.setJustificationText(absence.getJustificationText());
        dto.setJustificationDocumentPath(absence.getJustificationDocumentPath());
        dto.setJustificationStatut(absence.getJustificationStatut());
        dto.setDateSeance(date);
        dto.setDureeHeures(duree);
        return dto;
    }
}