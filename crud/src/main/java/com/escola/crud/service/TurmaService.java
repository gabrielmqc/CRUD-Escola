package com.escola.crud.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.escola.crud.DTO.NovaTurmaDTO;
import com.escola.crud.DTO.TurmaResponseDTO;
import com.escola.crud.model.Curso;
import com.escola.crud.model.Turma;
import com.escola.crud.repository.CursoRepository;
import com.escola.crud.repository.TurmaRepository;

@Service
public class TurmaService {

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private CursoRepository cursoRepository;

    public Long createTurma(NovaTurmaDTO novaTurmaDTO) {
        Curso curso = cursoRepository.findById(novaTurmaDTO.cursoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Curso não encontrado"));

        var entity = new Turma(
                null,
                novaTurmaDTO.anoLetivo(),
                novaTurmaDTO.semestre(),
                novaTurmaDTO.turno(),
                curso, null, null
                );
        var matriculaSalva = turmaRepository.save(entity);

        return matriculaSalva.getId();
    }

     private TurmaResponseDTO toTurmaResponseDTO(Turma turma) {
        return new TurmaResponseDTO(
                turma.getAnoLetivo(),
                turma.getTurno(),
                turma.getSemestre()
                );
    }
    public Optional<Turma> getTurmaById(Long id) {
        var turma = turmaRepository.findById(id);
        return turma;
    }

    public List<TurmaResponseDTO> listTurmas() {
    List<Turma> turmas = turmaRepository.findAll();
    return turmas.stream()
        .map(this::toTurmaResponseDTO)
        .collect(Collectors.toList());
}

    public void deleteTurma(Long id) {
        var turmaExiste = turmaRepository.existsById(id);

        if (turmaExiste) {
            turmaRepository.deleteById(id);
        }
    }
}
