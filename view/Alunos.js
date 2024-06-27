function openTab(evt, tabName) {
    var i, tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    var tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("#alunosForm");
    const nome = document.querySelector("#nome");
    const dataDeNascimento = document.querySelector("#dataDeNascimento");
    const endereco = document.querySelector("#endereco");
    const telefone = document.querySelector("#telefone");
    const email = document.querySelector("#email");
    const cpf = document.querySelector("#cpf");
    const rg = document.querySelector("#rg");
    const dataMatricula = document.querySelector("#dataMatricula");
    const idTurma = document.querySelector("#idTurma");
    const cursoNome = document.querySelector("#nome");

    const adicionarAlunoBtn = document.querySelector("#adicionarAlunoBtn");
    const adicionarCursoBtn = document.querySelector("#adicionarCursoBtn");
  
    const alunosTable = document.querySelector("#alunosTable tbody");
    const cursosTable = document.querySelector("#cursosTable tbody");
    const salasTable = document.querySelector("#salasTable tbody");
  
    adicionarAlunoBtn.addEventListener("click", adicionarAluno);
    adicionarCursoBtn.addEventListener("click", adicionarCurso);

    document.addEventListener("DOMContentLoaded", function () {
        const alunosBtn = document.querySelector("#alunosBtn");
        const cursosBtn = document.querySelector("#cursosBtn");
        const salasBtn = document.querySelector("#salasBtn");
      
        const alunosTable = document.querySelector("#alunosTable");
        const cursosTable = document.querySelector("#cursosTable");
        const salasTable = document.querySelector("#salasTable");
      
        alunosBtn.addEventListener("click", function () {
          alunosTable.style.display = "table";
          fetchAlunos();
        });
      
        cursosBtn.addEventListener("click", function () {
          cursosTable.style.display = "table";
          fetchCursos();
        });
      
      });
  
    // Buscar alunos ao carregar a página
    fetchAlunos();
    fetchCursos();
    fetchSalas();
  
    function adicionarAluno() {
      const novoAluno = {
        nome: nome.value,
        dataDeNascimento: dataDeNascimento.value,
        endereco: endereco.value,
        telefone: telefone.value,
        email: email.value,
        cpf: cpf.value,
        rg: rg.value,
        dataMatricula: dataMatricula.value,
        idTurma: idTurma.value,
      };
  
      fetch("http://localhost:8080/alunos", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(novoAluno),
      }).then(function (res) {
        console.log(res);
        fetchAlunos(); // Atualizar tabela de alunos após adicionar um novo
      });
    }
  
    function adicionarCurso() {
      const novoCurso = {
        nome: cursoNome.value,
      };
  
      fetch("http://localhost:8080/cursos", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(novoCurso),
      })
        .then(function (res) {
          console.log(res);
          fetchCursos(); // Atualizar tabela de cursos após adicionar um novo
        })
        .catch(function (error) {
          console.error("Erro ao adicionar curso:", error);
        });
    }
    
  
    function fetchAlunos() {
        const alunosTable = document.querySelector("#alunosTable tbody");
        if (alunosTable) {
          fetch("http://localhost:8080/alunos")
            .then(function (response) {
              return response.json();
            })
            .then(function (alunos) {
              alunosTable.innerHTML = "";
              alunos.forEach(function (aluno) {
                const row = document.createElement("tr");
                row.innerHTML = `
                  <td>${aluno.nome}</td>
                  <td>${aluno.dataDeNascimento}</td>
                  <td>${aluno.endereco}</td>
                  <td>${aluno.telefone}</td>
                  <td>${aluno.email}</td>
                  <td>${aluno.cpf}</td>
                  <td>${aluno.rg}</td>
                  <td>${aluno.dataMatricula}</td>
                  <td>${aluno.idTurma}</td>
                `;
                alunosTable.appendChild(row);
              });
            });
        }
      }
      
      function fetchCursos() {
        const cursosTable = document.querySelector("#cursosTable tbody");
        if (cursosTable) {
          fetch("http://localhost:8080/cursos")
            .then(function (response) {
              return response.json();
            })
            .then(function (cursos) {
              cursosTable.innerHTML = "";
              cursos.forEach(function (curso) {
                const row = document.createElement("tr");
                row.innerHTML = `
                  <td>${curso.nome}</td>
                `;
                cursosTable.appendChild(row);
              });
            });
        }
      }
      
      function fetchSalas() {
        const salasTable = document.querySelector("#salasTable tbody");
        if (salasTable) {
          fetch("http://localhost:8080/salas")
            .then(function (response) {
              return response.json();
            })
            .then(function (salas) {
              salasTable.innerHTML = "";
              salas.forEach(function (sala) {
                const row = document.createElement("tr");
                row.innerHTML = `
                  <td>${sala.nome}</td>
                  <td>${sala.capacidade}</td>
                  <td>${sala.horarioId}</td>
                `;
                salasTable.appendChild(row);
              });
            });
        }
      }
      
      
      
    })      
  