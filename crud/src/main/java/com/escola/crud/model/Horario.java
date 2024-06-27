package com.escola.crud.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "horarios")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Horario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "turma_disciplina_id")
    @JsonIgnoreProperties({ "horarios", "turma", "disciplina", "professor", "avaliacoes" })
    private TurmaDisciplina turmaDisciplina;

    @ManyToOne
    @JoinColumn(name = "sala_id")
    @JsonIgnoreProperties("horarios")
    private Sala sala;

    @Column(name = "diaSemana")
    private String diaSemana;

    @Column(name = "dataInicio")
    private String dataInicio;

    @Column(name = "horaInicio")
    private String horaInicio;

    @Column(name = "dataFim")
    private String dataFim;

    @Column(name = "horaFim")
    private String horaFim;
    
  
}
