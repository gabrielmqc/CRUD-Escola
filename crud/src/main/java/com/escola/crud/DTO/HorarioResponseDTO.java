package com.escola.crud.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HorarioResponseDTO {

    private Long id;
    private String dataInicio;
    private String horaInicio;
    private String dataFim;
    private String horaFim;
    private String diaSemana;
    private String nomeDisciplina;
    private Long idTurma;
}
