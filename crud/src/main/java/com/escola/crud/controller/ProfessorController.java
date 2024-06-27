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

import com.escola.crud.model.Professor;
import com.escola.crud.service.ProfessorService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/professores")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;
    
     @GetMapping
    public ResponseEntity<List<Professor>> listProfessores() {
        var professores = professorService.listProfessores();

        return ResponseEntity.ok(professores);

    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Professor> findById(@PathVariable Long id) {
        var professor = professorService.getProfessorById(id);

        if (professor.isPresent()) {
            return ResponseEntity.ok(professor.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Professor> insert(@RequestBody Professor professor) {
        var professorID = professorService.createProfessor(professor);
        return ResponseEntity.created(URI.create("/professors/" + professorID.toString())).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteprofessor(@PathVariable Long id) {
        professorService.deleteProfessor(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateProfessor(@PathVariable Long id, @RequestBody Professor professor) {
        professorService.updateProfessor(id, professor);
        return ResponseEntity.noContent().build();
    }
    
}
