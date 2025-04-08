package com.prj.nosql.service;

import com.prj.nosql.dto.AbsenceEtudiantDto;
import com.prj.nosql.dto.JustificationRequest;
import com.prj.nosql.dto.JustificationResponseDto;

import java.util.List;

public interface AbsenceService {
    List<AbsenceEtudiantDto> getAbsencesByEtudiant(String etudiantId);
    void ajouterOuModifierJustification(String absenceId, JustificationRequest request, String etudiantId);
    public List<JustificationResponseDto> getJustificationsEnAttente(String professeurId);
    public void updateStatutJustification(String absenceId, String statut, String professeurId);
}
