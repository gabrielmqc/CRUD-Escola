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

import com.escola.crud.DTO.HorarioResponseDTO;
import com.escola.crud.DTO.NovoHorarioDTO;
import com.escola.crud.model.Horario;
import com.escola.crud.service.HorarioService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/horarios")
public class HorarioController {
    
    @Autowired
    private HorarioService horarioService;

    @GetMapping
    public ResponseEntity<List<HorarioResponseDTO>> listHorarios() {
        var horarios = horarioService.listHorarios();

        return ResponseEntity.ok(horarios);

    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Horario> findById(@PathVariable Long id) {
        var horario = horarioService.getHorarioById(id);

        if (horario.isPresent()) {
            return ResponseEntity.ok(horario.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Horario> createHorario(@RequestBody NovoHorarioDTO novoHorarioDTO) {
        var horarioId = horarioService.save(novoHorarioDTO);
        return ResponseEntity.created(URI.create("/Horario/" + horarioId.toString())).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHorario(@PathVariable Long id) {
        horarioService.deleteHorario(id);
        return ResponseEntity.noContent().build();
    }
}
