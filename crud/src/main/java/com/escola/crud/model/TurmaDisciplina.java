package com.escola.crud.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "turma_disciplinas")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TurmaDisciplina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "turma_id")
    @JsonIgnoreProperties({ "turmaDisciplinas", "matriculas" })
    private Turma turma;

    @ManyToOne
    @JoinColumn(name = "disciplina_id")
    @JsonIgnoreProperties("turmaDisciplinas")
    private Disciplina disciplina;

    @ManyToOne
    @JoinColumn(name = "professor_id")
    @JsonIgnoreProperties({"turmaDisciplinas", "professor"})
    private Professor professor;

    @OneToMany(mappedBy = "turmaDisciplina", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("turmaDisciplina")
    private List<Avaliacao> avaliacoes;

    @OneToMany(mappedBy = "turmaDisciplina", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("turmaDisciplina")
    private List<Horario> horarios;
}
