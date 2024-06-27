package com.escola.crud.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.escola.crud.DTO.AvaliacaoResponseDTO;
import com.escola.crud.DTO.NovaAvaliacaoDTO;
import com.escola.crud.model.TurmaDisciplina;
import com.escola.crud.model.Avaliacao;
import com.escola.crud.repository.AvaliacaoRepository;
import com.escola.crud.repository.TurmaDisciplinaRepository;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private TurmaDisciplinaRepository turmaDisciplinaRepository;

    private AvaliacaoResponseDTO toAvaliacaoResponseDTO(Avaliacao avaliacao) {
        return new AvaliacaoResponseDTO(
                avaliacao.getId(),
                avaliacao.getTipo(),
                avaliacao.getData(),
                avaliacao.getPeso(),
                avaliacao.getTurmaDisciplina().getId());
    }

    public AvaliacaoResponseDTO saveAvaliacao(NovaAvaliacaoDTO novaAvaliacaoDTO) {
        TurmaDisciplina turmaDisciplina = turmaDisciplinaRepository.findById(novaAvaliacaoDTO.turmaDisciplinaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Disciplina não encontrada"));

        var entity = new Avaliacao(
                null,
                novaAvaliacaoDTO.tipo(),
                novaAvaliacaoDTO.data(),
                novaAvaliacaoDTO.peso(),
                turmaDisciplina);

        var avaliacaoSalva = avaliacaoRepository.save(entity);

        return toAvaliacaoResponseDTO(avaliacaoSalva);
    }


    public Optional<Avaliacao> getAvaliacaoById(Long id) {
        var avaliacao = avaliacaoRepository.findById(id);
        return avaliacao;
    }

    public List<Avaliacao> listAvaliacoes() {
        return avaliacaoRepository.findAll();
    }

    public void deleteAvaliacao(Long id) {
        var avaliacaoExiste = avaliacaoRepository.existsById(id);

        if (avaliacaoExiste) {
            avaliacaoRepository.deleteById(id);
        }
    }
}
