package com.escola.crud.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DisciplinaResponseDTO {
    private Long id;
    private String nome;
    private int cargaHoraria;
}
