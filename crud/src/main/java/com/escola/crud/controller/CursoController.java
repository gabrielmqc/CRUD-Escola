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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.escola.crud.model.Curso;
import com.escola.crud.service.CursoService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/cursos")
public class CursoController {
    
    @Autowired
    private CursoService cursoService;

   @GetMapping
    public ResponseEntity<List<Curso>> listcursoes() {
        var cursos = cursoService.listCursos();

        return ResponseEntity.ok(cursos);

    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Curso> findById(@PathVariable Long id) {
        var curso = cursoService.getCursoById(id);

        if (curso.isPresent()) {
            return ResponseEntity.ok(curso.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Curso> insert(@RequestBody Curso curso) {
        var cursoID = cursoService.createCurso(curso);
        return ResponseEntity.created(URI.create("/cursos/" + cursoID.toString())).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCurso(@PathVariable Long id) {
        cursoService.deleteCurso(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateCurso(@PathVariable Long id, @RequestBody Curso curso) {
        cursoService.updateCurso(id, curso);
        return ResponseEntity.noContent().build();
    }
}
