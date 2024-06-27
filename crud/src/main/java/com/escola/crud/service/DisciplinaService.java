package com.escola.crud.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.escola.crud.DTO.DisciplinaResponseDTO;
import com.escola.crud.DTO.NovaDisciplinaDTO;
import com.escola.crud.model.Disciplina;
import com.escola.crud.model.TurmaDisciplina;
import com.escola.crud.repository.DisciplinaRepository;
import com.escola.crud.repository.TurmaDisciplinaRepository;

@Service
public class DisciplinaService {

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    @Autowired
    private TurmaDisciplinaRepository turmaDisciplinaRepository;

    public List<Disciplina> findAll() {
        return disciplinaRepository.findAll();
    }

    public Disciplina findById(Long id) {
        return disciplinaRepository.findById(id).orElse(null);
    }

    public Long save(NovaDisciplinaDTO novaDisciplinaDTO) {

        TurmaDisciplina turmaDisciplina = turmaDisciplinaRepository.findById(novaDisciplinaDTO.turmaDisciplinasId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Turma não encontrado"));

        var entity = new Disciplina(
                null,
                novaDisciplinaDTO.nome(),
                novaDisciplinaDTO.cargaHoraria(),
                List.of(turmaDisciplina)
                );

        var disciplinaSalva = disciplinaRepository.save(entity);

        return disciplinaSalva.getId();

    }

    private DisciplinaResponseDTO toDisciplinaResponseDTO(Disciplina disciplina) {
        return new DisciplinaResponseDTO(
                disciplina.getId(),
                disciplina.getNome(),
                disciplina.getCargaHoraria());
    }

    public void deleteDisciplina(Long id) {
        var disciplinaExiste = disciplinaRepository.existsById(id);

        if (disciplinaExiste) {
            disciplinaRepository.deleteById(id);
        }
    }

    public List<DisciplinaResponseDTO> listDisciplinas() {
    List<Disciplina> Disciplinas = disciplinaRepository.findAll();
    return Disciplinas.stream()
        .map(this::toDisciplinaResponseDTO)
        .collect(Collectors.toList());
}

    public Optional<Disciplina> getDisciplinaById(Long id) {
        var disciplina = disciplinaRepository.findById(id);
        return disciplina;
    }
}

