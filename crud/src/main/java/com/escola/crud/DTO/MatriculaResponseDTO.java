package com.escola.crud.DTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatriculaResponseDTO {
    
    private LocalDate dataMatricula;
    private String aluno;
    private String turma;
    

}
