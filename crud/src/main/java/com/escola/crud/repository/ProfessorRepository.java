package com.escola.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.escola.crud.model.Professor;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    // Add custom query methods here if needed
    boolean existsByEmail(String email);
    boolean existsByCpf(String cpf);
    boolean existsByRg(String rg);
}
