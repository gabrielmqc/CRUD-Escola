package com.escola.crud.DTO;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotaResponseDTO {
    private Long id;
    private Double valor;
    private Long idAluno;
    private Long idAvaliacao;
    private LocalDate dataAvaliacao;

    // Construtores, getters e setters

    public NotaResponseDTO(Long id, Double valor, Long idAluno, Long idAvaliacao, LocalDate dataAvaliacao) {
        this.id = id;
        this.valor = valor;
        this.idAluno = idAluno;
        this.idAvaliacao = idAvaliacao;
        this.dataAvaliacao = dataAvaliacao;
    }
}
