package com.escola.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.escola.crud.model.Curso;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
    // Add custom query methods here if needed
    
}
