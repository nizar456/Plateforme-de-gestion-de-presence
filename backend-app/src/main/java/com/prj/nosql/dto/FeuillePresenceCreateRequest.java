package com.prj.nosql.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class FeuillePresenceCreateRequest {
    private Date dateSeance;
    private double dureeHeures;
    private List<String> absentsIds; // liste des étudiants absents
}

