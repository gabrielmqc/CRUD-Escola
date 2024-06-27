package com.escola.crud.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.escola.crud.DTO.NotaResponseDTO;
import com.escola.crud.DTO.NovaNotaDTO;
import com.escola.crud.model.Aluno;
import com.escola.crud.model.Avaliacao;
import com.escola.crud.model.Nota;
import com.escola.crud.repository.AlunoRepository;
import com.escola.crud.repository.AvaliacaoRepository;
import com.escola.crud.repository.NotaRepository;

@Service
public class NotaService {

    @Autowired
    private NotaRepository notaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    public List<Nota> findAll() {
        return notaRepository.findAll();
    }

    public Nota findById(Long id) {
        return notaRepository.findById(id).orElse(null);
    }

    public Long save(NovaNotaDTO novaNotaDTO) {

        Aluno aluno = alunoRepository.findById(novaNotaDTO.idAluno())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aluno não encontrado"));

        Avaliacao avaliacao = avaliacaoRepository.findById(novaNotaDTO.idAvaliacao())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Avaliacao não encontrada"));

        var entity = new Nota(
                null,
                novaNotaDTO.valor(),
                aluno,
                avaliacao);

        var notaSalva = notaRepository.save(entity);

        return notaSalva.getId();

    }

    private NotaResponseDTO toNotaResponseDTO(Nota nota) {
        return new NotaResponseDTO(
                nota.getId(),
                nota.getValor(),
                nota.getAluno().getId(),
                nota.getAvaliacao().getId(),
                nota.getAvaliacao().getData());
    }

    public void deleteNota(Long id) {
        var notaExiste = notaRepository.existsById(id);

        if (notaExiste) {
            notaRepository.deleteById(id);
        }
    }

    public List<NotaResponseDTO> listNotas() {
    List<Nota> notas = notaRepository.findAll();
    return notas.stream()
        .map(this::toNotaResponseDTO)
        .collect(Collectors.toList());
}

    public Optional<Nota> getNotaById(Long id) {
        var nota = notaRepository.findById(id);
        return nota;
    }
}
