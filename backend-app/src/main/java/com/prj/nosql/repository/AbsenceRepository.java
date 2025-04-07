package com.prj.nosql.repository;

import com.prj.nosql.model.Absence;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AbsenceRepository extends MongoRepository<Absence, String> {
    List<Absence> findByFeuillePresenceId(String feuillePresenceId);
    List<Absence> findByFeuillePresenceIdAndJustificationStatutIn(String feuilleId, List<Absence.JustificationStatut> statuts);
    void deleteByFeuillePresenceId(String feuillePresenceId);
    List<Absence> findByEtudiantId(String etudiantId);

}