package com.prj.nosql.repository;

import com.prj.nosql.model.FeuillePresence;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface FeuillePresenceRepository extends MongoRepository<FeuillePresence, String> {
    List<FeuillePresence> findByModuleId(String moduleId);
}
