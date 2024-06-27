package com.escola.crud.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TurmaResponseDTO {
    
    private Integer anoLetivo;
    private String turno;
    private Integer semestre;
}
