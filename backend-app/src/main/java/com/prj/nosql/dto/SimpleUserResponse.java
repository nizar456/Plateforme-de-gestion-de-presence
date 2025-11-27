package com.prj.nosql.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SimpleUserResponse {
    private String id;
    private String nomComplet;
    private String email;

    public SimpleUserResponse(String id, String nomComplet, String email) {
        this.id = id;
        this.nomComplet = nomComplet;
        this.email = email;
    }
}
