package com.escola.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.escola.crud.model.Nota;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {
    
}
