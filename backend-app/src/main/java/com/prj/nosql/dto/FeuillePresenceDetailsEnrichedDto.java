package com.prj.nosql.dto;

import lombok.Data;

@Data
public class FeuillePresenceDetailsEnrichedDto extends FeuillePresenceDetailsDto {
    private String nomModule;
    private String nomClasse;
    private String niveauClasse;
    private String nomProfesseur;
    private String prenomProfesseur;
}
