document.addEventListener("DOMContentLoaded", function () {
    const disciplinasTable = document.querySelector("#disciplinasTable");
    const disciplinasForm = document.querySelector("#disciplinasForm");
  
    if (disciplinasForm) {
      const nome = document.querySelector("#nomeDisciplina");
      const cargaHoraria = document.querySelector("#cargaHoraria");
      const turmaDisciplinasId = document.querySelector("#turmaDisciplinasId");
  
      disciplinasForm.addEventListener("submit", function (event) {
        event.preventDefault();
        adicionarDisciplina(
          nome.value,
          cargaHoraria.value,
          turmaDisciplinasId.value
        );
        nome.value = "";
        cargaHoraria.value = "";
        turmaDisciplinasId.value = "";
      });
    }
  
    fetchData("disciplinas", disciplinasTable);
  });
  
  function adicionarDisciplina(nome, cargaHoraria, turmaDisciplinasId) {
    const novaDisciplina = {
      nome: nome,
      cargaHoraria: cargaHoraria,
      turmaDisciplinasId: turmaDisciplinasId,
    };
  
    fetch("http://localhost:8080/disciplinas", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(novaDisciplina),
    })
      .then(function (res) {
        console.log(res);
        fetchData("disciplinas", document.querySelector("#disciplinasTable"));
      })
      .catch(function (error) {
        console.error("Erro ao adicionar disciplina:", error);
      });
  }
  
  function removerDisciplina(id) {
    fetch(`http://localhost:8080/disciplinas/${id}`, {
      method: "DELETE",
    })
      .then(function (res) {
        console.log(res);
        fetchData("disciplinas", document.querySelector("#disciplinasTable"));
      })
      .catch(function (error) {
        console.error("Erro ao remover disciplina:", error);
      });
  }
  
  function atualizarDisciplina(id, novoNome, novaCargaHoraria, novoTurmaDisciplinasId) {
    const disciplinaAtualizada = {
      nome: novoNome,
      cargaHoraria: novaCargaHoraria,
      turmaDisciplinasId: novoTurmaDisciplinasId,
    };
  
    fetch(`http://localhost:8080/disciplinas/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(disciplinaAtualizada),
    })
      .then(function (res) {
        console.log(res);
        fetchData("disciplinas", document.querySelector("#disciplinasTable"));
      })
      .catch(function (error) {
        console.error("Erro ao atualizar disciplina:", error);
      });
  }
  
  function fetchData(endpoint, table) {
    fetch(`http://localhost:8080/${endpoint}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        renderTable(data, table);
      })
      .catch(function (error) {
        console.error(`Erro ao buscar ${endpoint}:`, error);
      });
  }
  
  function renderTable(data, table) {
    const tableBody = table.querySelector("tbody");
    tableBody.innerHTML = "";
  
    data.forEach(function (item) {
      const row = document.createElement("tr");
  
      const nomeCell = document.createElement("td");
      nomeCell.textContent = item.nome;
      row.appendChild(nomeCell);
  
      const cargaHorariaCell = document.createElement("td");
      cargaHorariaCell.textContent = item.cargaHoraria;
      row.appendChild(cargaHorariaCell);
  
      const acoesCell = document.createElement("td");
      const removerButton = document.createElement("button");
      removerButton.textContent = "Remover";
      removerButton.addEventListener("click", function () {
        removerDisciplina(item.id);
      });
      acoesCell.appendChild(removerButton);
  
      const atualizarButton = document.createElement("button");
      atualizarButton.textContent = "Atualizar";
      atualizarButton.addEventListener("click", function () {
        const novoNome = prompt("Digite o novo nome da disciplina:", item.nome);
        const novaCargaHoraria = prompt("Digite a nova carga horária da disciplina:", item.cargaHoraria);
        const novoTurmaDisciplinasId = prompt("Digite o novo ID da turma/disciplina:", item.turmaDisciplinasId);
        if (
          novoNome !== null &&
          novaCargaHoraria !== null &&
          novoTurmaDisciplinasId !== null
        ) {
          atualizarDisciplina(item.id, novoNome, novaCargaHoraria, novoTurmaDisciplinasId);
        }
      });
      acoesCell.appendChild(atualizarButton);
  
      row.appendChild(acoesCell);
      tableBody.appendChild(row);
    });
  }
  