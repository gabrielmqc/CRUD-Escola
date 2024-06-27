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

import com.escola.crud.DTO.NotaResponseDTO;
import com.escola.crud.DTO.NovaNotaDTO;
import com.escola.crud.model.Nota;
import com.escola.crud.service.NotaService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/notas")
public class NotaController {
    
    @Autowired
    private NotaService notaService;
    
    @GetMapping
    public ResponseEntity<List<NotaResponseDTO>> listNotas() {
        var notas = notaService.listNotas();

        return ResponseEntity.ok(notas);

    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Nota> findById(@PathVariable Long id) {
        var nota = notaService.getNotaById(id);

        if (nota.isPresent()) {
            return ResponseEntity.ok(nota.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Nota> createNota(@RequestBody NovaNotaDTO novaNotaDTO) {
        var notaId = notaService.save(novaNotaDTO);
        return ResponseEntity.created(URI.create("/Nota/" + notaId.toString())).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNota(@PathVariable Long id) {
        notaService.deleteNota(id);
        return ResponseEntity.noContent().build();
    }
}
