package com.escola.crud.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.escola.crud.DTO.NovaSalaDTO;
import com.escola.crud.model.Horario;
import com.escola.crud.model.Sala;
import com.escola.crud.repository.HorarioRepository;
import com.escola.crud.repository.SalaRepository;

@Service
public class SalaService {
    @Autowired
    private SalaRepository salaRepository;

    @Autowired
    private HorarioRepository horarioRepository;

    public List<Sala> findAll() {
        return salaRepository.findAll();
    }

    public Optional<Sala> findById(Long id) {
        return salaRepository.findById(id);
    }

    public Long save(NovaSalaDTO novaSalaDTO) {
        Horario horario = horarioRepository.findById(novaSalaDTO.horarioId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Horário não encontrado"));
        ;

        var entity = new Sala(
                null,
                novaSalaDTO.nome(),
                novaSalaDTO.capacidade(),
                List.of(horario));

        horario.setSala(entity);
        var salaSalva = salaRepository.save(entity);

        return salaSalva.getId();
    }

    public void deleteById(Long id) {
        salaRepository.deleteById(id);
    }
}
