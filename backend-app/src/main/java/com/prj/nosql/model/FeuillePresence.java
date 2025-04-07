package com.prj.nosql.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Document(collection = "feuille_presence")
@Data
public class FeuillePresence {
    @Id
    private String id;
    private String moduleId;  // Suffisant car référence le module
    private Date dateSeance;
    private double dureeHeures; // En heures désormais
    private Date createdAt;

    @Transient
    private List<Absence> absences; // Pour l'affichage seulement
}
