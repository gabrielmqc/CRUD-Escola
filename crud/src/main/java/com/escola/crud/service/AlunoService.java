package com.escola.crud.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.escola.crud.model.Aluno;
import com.escola.crud.repository.AlunoRepository;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    public Long createAluno(Aluno aluno) {

        if (alunoRepository.existsByEmail(aluno.getEmail())) {
            throw new ResponseStatusException(HttpStatus.ALREADY_REPORTED,
                    "Já existe um aluno cadastrado com esse email.");

        }

        // Verifica se já existe um aluno com o mesmo CPF
        if (alunoRepository.existsByCpf(aluno.getCpf())) {
            throw new ResponseStatusException(HttpStatus.ALREADY_REPORTED,
                    "Já existe um aluno cadastrado com esse cpf.");
        }

        // Verifica se já existe um aluno com o mesmo RG
        if (alunoRepository.existsByRg(aluno.getRg())) {
            throw new ResponseStatusException(HttpStatus.ALREADY_REPORTED,
                    "Já existe um aluno cadastrado com esse rg.");
        }
        var alunoSalvo = alunoRepository.save(aluno);
        return alunoSalvo.getId();
    }

    public Optional<Aluno> getAlunoById(Long id) {
        var aluno = alunoRepository.findById(id);
        return aluno;
    }

    public List<Aluno> listAlunos() {
        return alunoRepository.findAll();
    }

    public void deleteAluno(Long id) {
        var alunoExiste = alunoRepository.existsById(id);

        if (alunoExiste) {
            alunoRepository.deleteById(id);
        }
    }

    public void updateAluno(Long id, Aluno aluno) {
        var alunoExiste = alunoRepository.findById(id);

        if (alunoExiste.isPresent()) {
            var alunoAtualizado = alunoExiste.get();
            if (aluno.getNome() != null) {
                alunoAtualizado.setNome(aluno.getNome());
            }
            if (aluno.getEndereco() != null) {
                alunoAtualizado.setEndereco(aluno.getEndereco());
            }
            if (aluno.getDataDeNascimento() != null) {
                alunoAtualizado.setDataDeNascimento(aluno.getDataDeNascimento());
            }
            if (aluno.getCpf() != null) {
                alunoAtualizado.setCpf(aluno.getCpf());
            }
            if (aluno.getTelefone() != null) {
                alunoAtualizado.setTelefone(aluno.getTelefone());
            }
            if (aluno.getEmail() != null) {
                alunoAtualizado.setEmail(aluno.getEmail());
            }
            if (aluno.getRg() != null) {
                alunoAtualizado.setRg(aluno.getRg());
            }
            alunoRepository.save(alunoAtualizado);
        }

    }

}
