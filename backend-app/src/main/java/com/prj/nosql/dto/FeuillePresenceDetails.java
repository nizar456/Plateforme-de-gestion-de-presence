package com.prj.nosql.dto;

import com.prj.nosql.model.Absence;
import com.prj.nosql.model.FeuillePresence;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class FeuillePresenceDetails {
    private FeuillePresence feuille;
    private List<Absence> absences;
}
