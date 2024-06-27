package com.escola.crud.DTO;

import java.time.LocalDate;


public record NovaMatriculaDTO(LocalDate dataDeMatricula,
Long alunoId,
Long turmaId) {
    
}
