package com.escola.crud.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.escola.crud.DTO.MatriculaResponseDTO;
import com.escola.crud.DTO.NovaMatriculaDTO;
import com.escola.crud.model.Aluno;
import com.escola.crud.model.Matricula;
import com.escola.crud.model.Turma;
import com.escola.crud.repository.AlunoRepository;
import com.escola.crud.repository.MatriculaRepository;
import com.escola.crud.repository.TurmaRepository;

@Service
public class MatriculaService {

    @Autowired
    private MatriculaRepository matriculaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    public List<Matricula> findAll() {
        return matriculaRepository.findAll();
    }

    public Matricula findById(Long id) {
        return matriculaRepository.findById(id).orElse(null);
    }

    public Long save(NovaMatriculaDTO novaMatriculaDTO) {
        
        Aluno aluno = alunoRepository.findById(novaMatriculaDTO.alunoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aluno não encontrado"));

        Turma turma = turmaRepository.findById(novaMatriculaDTO.turmaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Turma não encontrada"));

        var entity = new Matricula(
                null,
                novaMatriculaDTO.dataDeMatricula(),
                aluno,
                turma);

        var matriculaSalva = matriculaRepository.save(entity);

        return matriculaSalva.getId();

    }
    private MatriculaResponseDTO toMatriculaResponseDTO(Matricula matricula) {
        return new MatriculaResponseDTO(
                matricula.getDataDeMatricula(),
                matricula.getAluno().getNome(),
                matricula.getTurma().getCurso().getNome()
                );
    }


    public void deleteMatricula(Long id) {
        var matriculaExiste = matriculaRepository.existsById(id);

        if(matriculaExiste){
            matriculaRepository.deleteById(id);
        }
    }

    public List<MatriculaResponseDTO> listMatriculas() {
    List<Matricula> matriculas = matriculaRepository.findAll();
    return matriculas.stream()
        .map(this::toMatriculaResponseDTO)
        .collect(Collectors.toList());
}

    public Optional<Matricula> getMatriculaById(Long id) {
        var matricula = matriculaRepository.findById(id);
        return matricula;
    }

}
