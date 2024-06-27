package com.escola.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.escola.crud.model.TurmaDisciplina;

@Repository
public interface TurmaDisciplinaRepository extends JpaRepository<TurmaDisciplina, Long> {
    // Add custom query methods here if needed
    
}
