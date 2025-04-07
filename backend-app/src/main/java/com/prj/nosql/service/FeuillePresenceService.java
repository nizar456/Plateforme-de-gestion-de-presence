package com.prj.nosql.service;

import com.prj.nosql.dto.FeuillePresenceCreateRequest;
import com.prj.nosql.dto.FeuillePresenceDetailsDto;
import com.prj.nosql.dto.FeuillePresencePreparationDto;
import com.prj.nosql.dto.FeuillePresenceUpdateRequest;

import java.util.List;

public interface FeuillePresenceService {
    FeuillePresenceDetailsDto creerFeuillePresence(String moduleId, String professeurId, FeuillePresenceCreateRequest request);
    List<FeuillePresenceDetailsDto> getFeuillesByModuleAndProfesseur(String moduleId, String professeurId);
    FeuillePresenceDetailsDto getDetailsFeuillePresence(String feuilleId);
    public FeuillePresencePreparationDto getEtudiantsDuModule(String moduleId);
    public FeuillePresenceDetailsDto modifierFeuille(String moduleId, String feuilleId, FeuillePresenceUpdateRequest request);
    public void supprimerFeuillePresence(String feuilleId);
}
