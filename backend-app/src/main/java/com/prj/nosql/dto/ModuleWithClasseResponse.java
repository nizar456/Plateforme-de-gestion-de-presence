package com.prj.nosql.dto;

import com.prj.nosql.model.Classe;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ModuleWithClasseResponse {
    private String id;
    private String titre;
    private String description;
    private Classe classe; // tu peux aussi créer un ClasseDTO si tu veux exposer moins d'infos
}
