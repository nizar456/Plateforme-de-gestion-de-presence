package com.prj.nosql.controller;

import com.prj.nosql.dto.FeuillePresenceDetailsDto;
import com.prj.nosql.dto.FeuillePresenceDetailsEnrichedDto;
import com.prj.nosql.service.FeuillePresenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/absences")
public class AbsenceadminController {

    private final FeuillePresenceService feuillePresenceService;

    @Autowired
    public AbsenceadminController(FeuillePresenceService feuillePresenceService) {
        this.feuillePresenceService = feuillePresenceService;
    }

    @GetMapping()
    public ResponseEntity<List<FeuillePresenceDetailsEnrichedDto>> getFeuillesPresence(){
        return ResponseEntity.ok(feuillePresenceService.getAllFeuillePresence());
    }



}