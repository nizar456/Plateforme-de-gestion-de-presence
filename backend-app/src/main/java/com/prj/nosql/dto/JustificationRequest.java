package com.prj.nosql.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class JustificationRequest {
    private String justificationText;
    private MultipartFile file;
}
