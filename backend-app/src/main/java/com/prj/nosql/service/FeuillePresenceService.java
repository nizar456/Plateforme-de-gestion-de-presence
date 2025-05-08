package com.prj.nosql.service;

import com.prj.nosql.dto.*;

import java.util.List;

public interface FeuillePresenceService {
    FeuillePresenceDetailsDto creerFeuillePresence(String moduleId, String professeurId, FeuillePresenceCreateRequest request);
    List<FeuillePresenceDetailsEnrichedDto> getAllFeuillePresence();
    List<FeuillePresenceDetailsDto> getFeuillesByModuleAndProfesseur(String moduleId, String professeurId);
    FeuillePresenceDetailsDto getDetailsFeuillePresence(String feuilleId);
    public FeuillePresencePreparationDto getEtudiantsDuModule(String moduleId);
    public FeuillePresenceDetailsDto modifierFeuille(String moduleId, String feuilleId, FeuillePresenceUpdateRequest request);
    public void supprimerFeuillePresence(String feuilleId);
}
