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

import com.escola.crud.DTO.NovaTurmaDTO;
import com.escola.crud.DTO.TurmaResponseDTO;
import com.escola.crud.model.Turma;
import com.escola.crud.service.TurmaService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/turmas")
public class TurmaController {

    @Autowired
    private TurmaService turmaService;

    @GetMapping
    public ResponseEntity<List<TurmaResponseDTO>> listTurmas() {
        var turmas = turmaService.listTurmas();

        return ResponseEntity.ok(turmas);

    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Turma> findById(@PathVariable Long id) {
        var turma = turmaService.getTurmaById(id);

        if (turma.isPresent()) {
            return ResponseEntity.ok(turma.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Turma> insert(@RequestBody NovaTurmaDTO novaTurmaDTO) {
        var turmaID = turmaService.createTurma(novaTurmaDTO);
        return ResponseEntity.created(URI.create("/turmas/" + turmaID.toString())).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteturma(@PathVariable Long id) {
        turmaService.deleteTurma(id);
        return ResponseEntity.noContent().build();
    }
}
