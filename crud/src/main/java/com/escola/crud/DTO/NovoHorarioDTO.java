package com.escola.crud.DTO;



public record NovoHorarioDTO(Long turmaDisciplinaId,Long salaId , String diaSemana, String dataInicio,
        String horaInicio, String dataFim, String horaFim) {

}
