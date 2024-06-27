document.addEventListener("DOMContentLoaded", function () {
    const salasTable = document.querySelector("#salasTable");
    const salasForm = document.querySelector("#salaForm");
  
    if (salasForm) {
      const nomeSala = document.querySelector("#nomeSala");
      const capacidade = document.querySelector("#capacidade");
      const horarioId = document.querySelector("#horarioIdSala");
  
      salasForm.addEventListener("submit", function (event) {
        event.preventDefault();
        adicionarSala(nomeSala.value, capacidade.value, horarioId.value);
        nomeSala.value = "";
        capacidade.value = "";
        horarioId.value = "";
      });
    }
  
    fetchData("salas", salasTable);
  });
  
  function adicionarSala(nome, capacidade, horarioId) {
    const novaSala = {
      nome: nome,
      capacidade: capacidade,
      horarioId: horarioId,
    };
  
    fetch("http://localhost:8080/salas", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(novaSala),
    })
      .then(function (res) {
        console.log(res);
        fetchData("salas", document.querySelector("#salasTable"));
      })
      .catch(function (error) {
        console.error("Erro ao adicionar sala:", error);
      });
  }
  
  function removerSala(id) {
    fetch(`http://localhost:8080/salas/${id}`, {
      method: "DELETE",
    })
      .then(function (res) {
        console.log(res);
        fetchData("salas", document.querySelector("#salasTable"));
      })
      .catch(function (error) {
        console.error("Erro ao remover sala:", error);
      });
  }
  
  function atualizarSala(id, novoNome, novaCapacidade, novoHorarioId) {
    const salaAtualizada = {
      nome: novoNome,
      capacidade: novaCapacidade,
      horarioId: novoHorarioId,
    };
  
    fetch(`http://localhost:8080/salas/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(salaAtualizada),
    })
      .then(function (res) {
        console.log(res);
        fetchData("salas", document.querySelector("#salasTable"));
      })
      .catch(function (error) {
        console.error("Erro ao atualizar sala:", error);
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
  
      const capacidadeCell = document.createElement("td");
      capacidadeCell.textContent = item.capacidade;
      row.appendChild(capacidadeCell);
  
      const acoesCell = document.createElement("td");
      const removerButton = document.createElement("button");
      removerButton.textContent = "Remover";
      removerButton.addEventListener("click", function () {
        removerSala(item.id);
      });
      acoesCell.appendChild(removerButton);
  
      const atualizarButton = document.createElement("button");
      atualizarButton.textContent = "Atualizar";
      atualizarButton.addEventListener("click", function () {
        const novoNome = prompt("Digite o novo nome da sala:", item.nome);
        const novaCapacidade = prompt("Digite a nova capacidade da sala:", item.capacidade);
        const novoHorarioId = prompt("Digite o novo ID do horário:", item.horarioId);
        if (novoNome !== null && novaCapacidade !== null && novoHorarioId !== null) {
          atualizarSala(item.id, novoNome, novaCapacidade, novoHorarioId);
        }
      });
      acoesCell.appendChild(atualizarButton);
  
      row.appendChild(acoesCell);
      tableBody.appendChild(row);
    });
  }
  