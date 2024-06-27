package com.escola.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.escola.crud.model.Matricula;

@Repository
public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
    // Add custom query methods here if needed
    
}
