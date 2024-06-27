package com.escola.crud.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.escola.crud.DTO.AvaliacaoResponseDTO;
import com.escola.crud.DTO.NovaAvaliacaoDTO;
import com.escola.crud.model.Avaliacao;
import com.escola.crud.service.AvaliacaoService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/avaliacoes")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @GetMapping
    public ResponseEntity<List<Avaliacao>> listAvaliacoes() {
        var avaliacoes = avaliacaoService.listAvaliacoes();

        return ResponseEntity.ok(avaliacoes);

    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Avaliacao> findById(@PathVariable Long id) {
        var avaliacao = avaliacaoService.getAvaliacaoById(id);

        if (avaliacao.isPresent()) {
            return ResponseEntity.ok(avaliacao.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<AvaliacaoResponseDTO> createAvaliacao(@RequestBody NovaAvaliacaoDTO novaAvaliacaoDTO) {
        AvaliacaoResponseDTO avaliacaoResponse = avaliacaoService.saveAvaliacao(novaAvaliacaoDTO);
        return ResponseEntity.created(URI.create("/avaliacoes/" + avaliacaoResponse.getId())).body(avaliacaoResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAvaliacao(@PathVariable Long id) {
        avaliacaoService.deleteAvaliacao(id);
        return ResponseEntity.noContent().build();
    }
}
