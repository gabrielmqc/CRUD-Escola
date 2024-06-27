INSERT INTO alunos (nome, data_de_nascimento, endereco, telefone, email, cpf, rg, data_matricula)
VALUES ('João Silva', '1995-03-15', 'Rua A, 123', '1199998888', 'joao@email.com', '12345678901', '123456789', '2023-04-01');

INSERT INTO alunos (nome, data_de_nascimento, endereco, telefone, email, cpf, rg, data_matricula)
VALUES ('Maria Souza', '2000-07-20', 'Avenida B, 456', '1177776666', 'maria@email.com', '09876543210', '987654321', '2023-03-15');

INSERT INTO alunos (nome, data_de_nascimento, endereco, telefone, email, cpf, rg, data_matricula)
VALUES ('Pedro Oliveira', '1998-11-05', 'Rua C, 789', '1155554444', 'pedro@email.com', '45678912345', '456789123', '2022-09-01');

INSERT INTO alunos (nome, data_de_nascimento, endereco, telefone, email, cpf, rg, data_matricula)
VALUES ('Ana Santos', '2002-02-28', 'Avenida D, 159', '1133332222', 'ana@email.com', '78901234567', '789012345', '2023-01-15');

INSERT INTO alunos (nome, data_de_nascimento, endereco, telefone, email, cpf, rg, data_matricula)
VALUES ('Lucas Ferreira', '1997-06-10', 'Rua E, 753', '1122221111', 'lucas@email.com', '63258741963', '258741963', '2022-08-01');

INSERT INTO cursos (nome) VALUES ('Engenharia de Software');
INSERT INTO cursos (nome) VALUES ('Ciência da Computação');
INSERT INTO cursos (nome) VALUES ('Administração');
INSERT INTO cursos (nome) VALUES ('Direito');
INSERT INTO cursos (nome) VALUES ('Medicina');
INSERT INTO cursos (nome) VALUES ('Psicologia');
INSERT INTO cursos (nome) VALUES ('Arquitetura');
INSERT INTO cursos (nome) VALUES ('Design Gráfico');
INSERT INTO cursos (nome) VALUES ('Engenharia Civil');
INSERT INTO cursos (nome) VALUES ('Engenharia Elétrica');

INSERT INTO disciplinas (nome, carga_horaria) VALUES ('Programação Orientada a Objetos', 80);
INSERT INTO disciplinas (nome, carga_horaria) VALUES ('Estruturas de Dados', 60);
INSERT INTO disciplinas (nome, carga_horaria) VALUES ('Banco de Dados', 60);
INSERT INTO disciplinas (nome, carga_horaria) VALUES ('Engenharia de Software', 40);
INSERT INTO disciplinas (nome, carga_horaria) VALUES ('Redes de Computadores', 60);
INSERT INTO disciplinas (nome, carga_horaria) VALUES ('Cálculo I', 80);
INSERT INTO disciplinas (nome, carga_horaria) VALUES ('Física I', 60);
INSERT INTO disciplinas (nome, carga_horaria) VALUES ('Contabilidade Geral', 60);
INSERT INTO disciplinas (nome, carga_horaria) VALUES ('Direito Constitucional', 40);
INSERT INTO disciplinas (nome, carga_horaria) VALUES ('Anatomia Humana', 80);

INSERT INTO turmas (ano_letivo, semestre, turno, curso_id) VALUES (2023, 1, 'Manhã', 1);
INSERT INTO turmas (ano_letivo, semestre, turno, curso_id) VALUES (2023, 1, 'Tarde', 2);
INSERT INTO turmas (ano_letivo, semestre, turno, curso_id) VALUES (2023, 1, 'Noite', 3);
INSERT INTO turmas (ano_letivo, semestre, turno, curso_id) VALUES (2023, 2, 'Manhã', 4);
INSERT INTO turmas (ano_letivo, semestre, turno, curso_id) VALUES (2023, 2, 'Tarde', 5);
INSERT INTO turmas (ano_letivo, semestre, turno, curso_id) VALUES (2022, 1, 'Noite', 1);
INSERT INTO turmas (ano_letivo, semestre, turno, curso_id) VALUES (2022, 2, 'Manhã', 2);
INSERT INTO turmas (ano_letivo, semestre, turno, curso_id) VALUES (2022, 2, 'Tarde', 3);
INSERT INTO turmas (ano_letivo, semestre, turno, curso_id) VALUES (2022, 1, 'Noite', 4);
INSERT INTO turmas (ano_letivo, semestre, turno, curso_id) VALUES (2022, 1, 'Manhã', 5);

INSERT INTO professores (nome, email, cpf, rg, titulacao, data_contratacao) VALUES ('João Silva', 'joao@email.com', '12345678901', '123456789', 'Doutor', '2015-03-01');
INSERT INTO professores (nome, email, cpf, rg, titulacao, data_contratacao) VALUES ('Maria Souza', 'maria@email.com', '09876543210', '987654321', 'Mestre', '2018-07-15');
INSERT INTO professores (nome, email, cpf, rg, titulacao, data_contratacao) VALUES ('Pedro Oliveira', 'pedro@email.com', '45678912345', '456789123', 'Doutor', '2012-09-01');
INSERT INTO professores (nome, email, cpf, rg, titulacao, data_contratacao) VALUES ('Ana Santos', 'ana@email.com', '78901234567', '789012345', 'Especialista', '2020-02-01');
INSERT INTO professores (nome, email, cpf, rg, titulacao, data_contratacao) VALUES ('Lucas Ferreira', 'lucas@email.com', '63258741963', '258741963', 'Mestre', '2017-06-01');
INSERT INTO professores (nome, email, cpf, rg, titulacao, data_contratacao) VALUES ('Carla Mendes', 'carla@email.com', '14725836971', '147258369', 'Doutor', '2014-08-15');
INSERT INTO professores (nome, email, cpf, rg, titulacao, data_contratacao) VALUES ('Rafael Almeida', 'rafael@email.com', '36925814707', '369258147', 'Mestre', '2019-03-01');
INSERT INTO professores (nome, email, cpf, rg, titulacao, data_contratacao) VALUES ('Juliana Pereira', 'juliana@email.com', '74185296325', '741852963', 'Especialista', '2016-01-01');
INSERT INTO professores (nome, email, cpf, rg, titulacao, data_contratacao) VALUES ('Gustavo Ribeiro', 'gustavo@email.com', '25874136951', '258741369', 'Doutor', '2013-05-01');
INSERT INTO professores (nome, email, cpf, rg, titulacao, data_contratacao) VALUES ('Fernanda Costa', 'fernanda@email.com', '96325874101', '963258741', 'Mestre', '2021-09-15');

-- Exemplo 1
INSERT INTO turma_disciplinas (turma_id, disciplina_id, professor_id)
VALUES (1, 1, 1);

-- Exemplo 2
INSERT INTO turma_disciplinas (turma_id, disciplina_id, professor_id)
VALUES (2, 2, 2);

-- Exemplo 3
INSERT INTO turma_disciplinas (turma_id, disciplina_id, professor_id)
VALUES (3, 3, 3);

-- Exemplo 4
INSERT INTO turma_disciplinas (turma_id, disciplina_id, professor_id)
VALUES (4, 4, 4);

-- Exemplo 5
INSERT INTO turma_disciplinas (turma_id, disciplina_id, professor_id)
VALUES (5, 5, 5);

-- Exemplo 6
INSERT INTO turma_disciplinas (turma_id, disciplina_id, professor_id)
VALUES (6, 6, 6);

-- Exemplo 7
INSERT INTO turma_disciplinas (turma_id, disciplina_id, professor_id)
VALUES (7, 7, 7);

-- Exemplo 8
INSERT INTO turma_disciplinas (turma_id, disciplina_id, professor_id)
VALUES (8, 8, 8);

-- Exemplo 9
INSERT INTO turma_disciplinas (turma_id, disciplina_id, professor_id)
VALUES (9, 9, 9);

-- Exemplo 10
INSERT INTO turma_disciplinas (turma_id, disciplina_id, professor_id)
VALUES (10, 10, 10);

INSERT INTO salas (nome, capacidade) VALUES ('Sala A', 30);
INSERT INTO salas (nome, capacidade) VALUES ('Sala B', 40);
INSERT INTO salas (nome, capacidade) VALUES ('Sala C', 25);
INSERT INTO salas (nome, capacidade) VALUES ('Sala D', 35);
INSERT INTO salas (nome, capacidade) VALUES ('Sala E', 45);
INSERT INTO salas (nome, capacidade) VALUES ('Laboratório 1', 20);
INSERT INTO salas (nome, capacidade) VALUES ('Laboratório 2', 25);
INSERT INTO salas (nome, capacidade) VALUES ('Auditório', 100);
INSERT INTO salas (nome, capacidade) VALUES ('Sala de Estudos', 15);
INSERT INTO salas (nome, capacidade) VALUES ('Sala de Reuniões', 10);

INSERT INTO horarios (turma_disciplina_id, sala_id, dia_semana, data_inicio, hora_inicio, data_fim, hora_fim)
VALUES (1, 1, 'Segunda', '2023-05-15', '08:00:00', '2023-05-15', '10:00:00');


