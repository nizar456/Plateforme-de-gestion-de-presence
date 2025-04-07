package com.prj.nosql.controller;

import com.prj.nosql.model.Absence;
import com.prj.nosql.service.FeuillePresenceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/student/absences")
public class AbsenceController {

    private final FeuillePresenceService feuillePresenceService;

    public AbsenceController(FeuillePresenceService feuillePresenceService) {
        this.feuillePresenceService = feuillePresenceService;
    }


}