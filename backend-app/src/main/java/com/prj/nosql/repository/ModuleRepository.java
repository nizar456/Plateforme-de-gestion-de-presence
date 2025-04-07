package com.prj.nosql.repository;

import com.prj.nosql.model.Module;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ModuleRepository extends MongoRepository<Module, String> {
    List<Module> findByClasseId(String classeId);
    @Query("{ 'professeurId': ?0 }")
    List<Module> findByProfesseurId(String professeurId);
}