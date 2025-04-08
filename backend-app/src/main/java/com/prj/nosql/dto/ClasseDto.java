package com.prj.nosql.dto;

import com.prj.nosql.model.Classe;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClasseDto {
    private String id;
    private String nom;
    private Classe.Niveau niveau;
}
