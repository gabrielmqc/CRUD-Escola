package com.escola.crud.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.escola.crud.model.Professor;
import com.escola.crud.repository.ProfessorRepository;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    public Long createProfessor(Professor professor) {
        // Verifica se já existe um professor com o mesmo email
        if (professorRepository.existsByEmail(professor.getEmail())) {
            throw new ResponseStatusException(HttpStatus.ALREADY_REPORTED, "Já existe um professor cadastrado com esse email.");
            
        }

        // Verifica se já existe um professor com o mesmo CPF
        if (professorRepository.existsByCpf(professor.getCpf())) {
            throw new ResponseStatusException(HttpStatus.ALREADY_REPORTED, "Já existe um professor cadastrado com esse cpf.");
        }

        // Verifica se já existe um professor com o mesmo RG
        if (professorRepository.existsByRg(professor.getRg())) {
            throw new ResponseStatusException(HttpStatus.ALREADY_REPORTED, "Já existe um professor cadastrado com esse rg.");
        }
        var professorSalvo = professorRepository.save(professor);
        return professorSalvo.getId();
    }

    public Optional<Professor> getProfessorById(Long id) {
        var professor = professorRepository.findById(id);
        return professor;
    }

    public List<Professor> listProfessores() {
        return professorRepository.findAll();
    }

    public void deleteProfessor(Long id) {
        var professorExiste = professorRepository.existsById(id);

        if (professorExiste) {
            professorRepository.deleteById(id);
        }
    }

    public void updateProfessor(Long id, Professor professor) {
        var professorExiste = professorRepository.findById(id);

        if (professorExiste.isPresent()) {
            var professorAtualizado = professorExiste.get();
            if (professor.getNome() != null) {
                professorAtualizado.setNome(professor.getNome());
            }
            if (professor.getCpf() != null) {
                professorAtualizado.setCpf(professor.getCpf());
            }
            if (professor.getEmail() != null) {
                professorAtualizado.setEmail(professor.getEmail());
            }
            if (professor.getRg() != null) {
                professorAtualizado.setRg(professor.getRg());
            }
            if (professor.getTitulacao() != null) {
                professorAtualizado.setTitulacao(professor.getTitulacao());
            }
            if (professor.getDataContratacao() != null) {
                professorAtualizado.setDataContratacao(professor.getDataContratacao());
            }

            professorRepository.save(professorAtualizado);
        }

    }

}
