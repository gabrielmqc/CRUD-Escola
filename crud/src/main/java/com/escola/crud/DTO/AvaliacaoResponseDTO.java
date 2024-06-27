package com.escola.crud.DTO;

import java.time.LocalDate;

public class AvaliacaoResponseDTO {
    private Long id;
    private String tipo;
    private LocalDate data;
    
    public AvaliacaoResponseDTO(Long id, String tipo, LocalDate data, Double peso, Long turmaDisciplinaId) {
        this.id = id;
        this.tipo = tipo;
        this.data = data;
        this.peso = peso;
        this.turmaDisciplinaId = turmaDisciplinaId;
    }
    private Double peso;
    private Long turmaDisciplinaId;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public LocalDate getData() {
        return data;
    }
    public void setData(LocalDate data) {
        this.data = data;
    }
    public Double getPeso() {
        return peso;
    }
    public void setPeso(Double peso) {
        this.peso = peso;
    }
    public Long getTurmaDisciplinaId() {
        return turmaDisciplinaId;
    }
    public void setTurmaDisciplinaId(Long turmaDisciplinaId) {
        this.turmaDisciplinaId = turmaDisciplinaId;
    }
}
