package com.prj.nosql.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;
@Data
public class FeuillePresenceRequest {
    private String moduleId;
    private Date dateSeance;
    private int dureeMinutes;
    private List<String> absentEtudiantIds;

    // Getters and Setters
}
