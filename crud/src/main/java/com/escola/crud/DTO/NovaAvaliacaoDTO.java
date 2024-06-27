package com.escola.crud.DTO;

import java.time.LocalDate;

public record NovaAvaliacaoDTO(String tipo, LocalDate data, Double peso, Long turmaDisciplinaId) {

    
}
