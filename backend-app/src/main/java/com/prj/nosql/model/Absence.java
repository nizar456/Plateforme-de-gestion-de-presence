package com.prj.nosql.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "absences")
@Data
public class Absence {
    @Id
    private String id;
    private String etudiantId;
    private String feuillePresenceId; // Référence à la feuille de présence
    private boolean justifie;
    private String justificationText;
    private String justificationDocumentPath;
    private JustificationStatut justificationStatut;

    public enum JustificationStatut {
        EN_ATTENTE, ACCEPTEE, REFUSEE
    }
}