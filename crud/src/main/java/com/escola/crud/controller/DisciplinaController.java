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

import com.escola.crud.DTO.DisciplinaResponseDTO;
import com.escola.crud.DTO.NovaDisciplinaDTO;
import com.escola.crud.model.Disciplina;
import com.escola.crud.service.DisciplinaService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/disciplinas")
public class DisciplinaController {
    
    @Autowired
    private DisciplinaService disciplinaService;

    @GetMapping
    public ResponseEntity<List<DisciplinaResponseDTO>> listDisciplinas() {
        var disciplinas = disciplinaService.listDisciplinas();

        return ResponseEntity.ok(disciplinas);

    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Disciplina> findById(@PathVariable Long id) {
        var disciplina = disciplinaService.getDisciplinaById(id);

        if (disciplina.isPresent()) {
            return ResponseEntity.ok(disciplina.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Disciplina> createDisciplina(@RequestBody NovaDisciplinaDTO novaDisciplinaDTO) {
        var disciplinaId = disciplinaService.save(novaDisciplinaDTO);
        return ResponseEntity.created(URI.create("/Disciplina/" + disciplinaId.toString())).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDisciplina(@PathVariable Long id) {
        disciplinaService.deleteDisciplina(id);
        return ResponseEntity.noContent().build();
    }
}
