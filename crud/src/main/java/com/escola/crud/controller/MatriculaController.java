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

import com.escola.crud.DTO.MatriculaResponseDTO;
import com.escola.crud.DTO.NovaMatriculaDTO;
import com.escola.crud.model.Matricula;
import com.escola.crud.service.MatriculaService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/matriculas")
public class MatriculaController {

    @Autowired
    private MatriculaService matriculaService;

    @GetMapping
    public ResponseEntity<List<MatriculaResponseDTO>> listMatriculas() {
        var matriculas = matriculaService.listMatriculas();

        return ResponseEntity.ok(matriculas);

    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Matricula> findById(@PathVariable Long id) {
        var matricula = matriculaService.getMatriculaById(id);

        if (matricula.isPresent()) {
            return ResponseEntity.ok(matricula.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Matricula> createMatricula(@RequestBody NovaMatriculaDTO novaMatriculaDTO) {
        var matriculaId = matriculaService.save(novaMatriculaDTO);
        return ResponseEntity.created(URI.create("/matricula/" + matriculaId.toString())).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatricula(@PathVariable Long id) {
        matriculaService.deleteMatricula(id);
        return ResponseEntity.noContent().build();
    }

}
