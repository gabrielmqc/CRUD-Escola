package com.escola.crud.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.escola.crud.DTO.HorarioResponseDTO;
import com.escola.crud.DTO.NovoHorarioDTO;
import com.escola.crud.model.Horario;
import com.escola.crud.model.Sala;
import com.escola.crud.model.TurmaDisciplina;
import com.escola.crud.repository.HorarioRepository;
import com.escola.crud.repository.SalaRepository;
import com.escola.crud.repository.TurmaDisciplinaRepository;

@Service
public class HorarioService {

    @Autowired
    private HorarioRepository horarioRepository;

    @Autowired
    private SalaRepository salaRepository;

    @Autowired
    private TurmaDisciplinaRepository turmaDisciplinaRepository;

    public List<Horario> findAll() {
        return horarioRepository.findAll();
    }

    public Horario findById(Long id) {
        return horarioRepository.findById(id).orElse(null);
    }

    public Long save(NovoHorarioDTO novoHorarioDTO) {

        Sala sala = salaRepository.findById(novoHorarioDTO.salaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sala não encontrado"));

        TurmaDisciplina turmaDisciplina = turmaDisciplinaRepository.findById(novoHorarioDTO.turmaDisciplinaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Turma não encontrada"));

                var entity = new Horario(
                    null,
                    turmaDisciplina,
                    sala,
                    novoHorarioDTO.diaSemana(),
                    novoHorarioDTO.dataInicio(),
                    novoHorarioDTO.horaInicio(),
                    novoHorarioDTO.dataFim(),
                    novoHorarioDTO.horaFim()
            );
        Horario horarioSalvo = horarioRepository.save(entity);

        return horarioSalvo.getId();

    }

    private HorarioResponseDTO toHorarioResponseDTO(Horario horario) {
        return new HorarioResponseDTO(
                horario.getId(),
                horario.getDataInicio(),
                horario.getHoraInicio(),
                horario.getDataFim(),
                horario.getHoraFim(),
                horario.getDiaSemana(),
                horario.getTurmaDisciplina().getDisciplina().getNome(),
                horario.getTurmaDisciplina().getTurma().getId());

    }

    public void deleteHorario(Long id) {
        var horarioExiste = horarioRepository.existsById(id);

        if (horarioExiste) {
            horarioRepository.deleteById(id);
        }
    }

    public List<HorarioResponseDTO> listHorarios() {
        List<Horario> horarios = horarioRepository.findAll();
        return horarios.stream()
                .map(this::toHorarioResponseDTO)
                .collect(Collectors.toList());
    }

    public Optional<Horario> getHorarioById(Long id) {
        var Horario = horarioRepository.findById(id);
        return Horario;
    }

}
