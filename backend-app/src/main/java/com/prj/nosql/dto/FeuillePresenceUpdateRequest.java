package com.prj.nosql.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class FeuillePresenceUpdateRequest {
    private Date dateSeance;
    private double dureeHeures;
    private List<String> absentsIds;
}
