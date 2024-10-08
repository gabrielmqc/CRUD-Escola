package com.escola.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.escola.crud.model.Turma;

@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long> {
    
}
