package com.escola.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.escola.crud.model.Sala;

public interface SalaRepository extends JpaRepository<Sala, Long> {
    
}
