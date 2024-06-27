package com.escola.crud.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.escola.crud.model.Curso;
import com.escola.crud.repository.CursoRepository;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    public Long createCurso(Curso curso) {
        // Verifica se já existe um curso com o mesmo email

        var cursoSalvo = cursoRepository.save(curso);
        return cursoSalvo.getId();
    }

    public Optional<Curso> getCursoById(Long id) {
        var curso = cursoRepository.findById(id);
        return curso;
    }

    public List<Curso> listCursos() {
        return cursoRepository.findAll();
    }

    public void deleteCurso(Long id) {
        var cursoExiste = cursoRepository.existsById(id);

        if (cursoExiste) {
            cursoRepository.deleteById(id);
        }
    }

    public void updateCurso(Long id, Curso curso) {
        var cursoExiste = cursoRepository.findById(id);

        if (cursoExiste.isPresent()) {
            var cursoAtualizado = cursoExiste.get();
            if (curso.getNome() != null) {
                cursoAtualizado.setNome(curso.getNome());

                cursoRepository.save(cursoAtualizado);
            }
        }
    }
}
