package com.prj.nosql.dto;

import com.prj.nosql.model.Absence;
import com.prj.nosql.model.FeuillePresence;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class FeuillePresenceDetailsDto {
    private String id;
    private String moduleId;
    private Date dateSeance;
    private double dureeHeures;
    private Date createdAt;
    private List<AbsenceDto> absences;
    public static FeuillePresenceDetailsDto fromEntity(FeuillePresence feuille, List<Absence> absences) {
        FeuillePresenceDetailsDto dto = new FeuillePresenceDetailsDto();
        dto.setId(feuille.getId());
        dto.setModuleId(feuille.getModuleId());
        dto.setDateSeance(feuille.getDateSeance());
        dto.setDureeHeures(feuille.getDureeHeures());
        dto.setCreatedAt(feuille.getCreatedAt());
        dto.setAbsences(absences.stream().map(AbsenceDto::fromEntity).collect(Collectors.toList()));
        return dto;
    }
}
