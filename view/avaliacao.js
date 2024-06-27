document.addEventListener("DOMContentLoaded", function () {
    const avaliacoesTable = document.querySelector("#avaliacoesTable");
    const avaliacoesForm = document.querySelector("#avaliacoesForm");
  
    if (avaliacoesForm) {
      const tipo = document.querySelector("#tipo");
      const data = document.querySelector("#data");
      const peso = document.querySelector("#peso");
      const turmaDisciplinaId = document.querySelector("#turmaDisciplinaId");
  
      avaliacoesForm.addEventListener("submit", function (event) {
        event.preventDefault();
        adicionarAvaliacao(
          tipo.value,
          data.value,
          peso.value,
          turmaDisciplinaId.value
        );
        tipo.value = "";
        data.value = "";
        peso.value = "";
        turmaDisciplinaId.value = "";
      });
    }
  
    fetchData("avaliacoes", avaliacoesTable);
  });
  
  function adicionarAvaliacao(tipo, data, peso, turmaDisciplinaId) {
    const novaAvaliacao = {
      tipo: tipo,
      data: data,
      peso: peso,
      turmaDisciplinaId: turmaDisciplinaId,
    };
  
    fetch("http://localhost:8080/avaliacoes", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(novaAvaliacao),
    })
      .then(function (res) {
        console.log(res);
        fetchData("avaliacoes", document.querySelector("#avaliacoesTable"));
      })
      .catch(function (error) {
        console.error("Erro ao adicionar avaliação:", error);
      });
  }
  
  function removerAvaliacao(id) {
    fetch(`http://localhost:8080/avaliacoes/${id}`, {
      method: "DELETE",
    })
      .then(function (res) {
        console.log(res);
        fetchData("avaliacoes", document.querySelector("#avaliacoesTable"));
      })
      .catch(function (error) {
        console.error("Erro ao remover avaliação:", error);
      });
  }
  
  function atualizarAvaliacao(id, novoTipo, novaData, novoPeso, novaTurmaDisciplinaId) {
    const avaliacaoAtualizada = {
      tipo: novoTipo,
      data: novaData,
      peso: novoPeso,
      turmaDisciplinaId: novaTurmaDisciplinaId,
    };
  
    fetch(`http://localhost:8080/avaliacoes/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(avaliacaoAtualizada),
    })
      .then(function (res) {
        console.log(res);
        fetchData("avaliacoes", document.querySelector("#avaliacoesTable"));
      })
      .catch(function (error) {
        console.error("Erro ao atualizar avaliação:", error);
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
  
      const tipoCell = document.createElement("td");
      tipoCell.textContent = item.tipo;
      row.appendChild(tipoCell);
  
      const dataCell = document.createElement("td");
      dataCell.textContent = item.data;
      row.appendChild(dataCell);
  
      const pesoCell = document.createElement("td");
      pesoCell.textContent = item.peso;
      row.appendChild(pesoCell);
  
      const acoesCell = document.createElement("td");
      const removerButton = document.createElement("button");
      removerButton.textContent = "Remover";
      removerButton.addEventListener("click", function () {
        removerAvaliacao(item.id);
      });
      acoesCell.appendChild(removerButton);
  
      const atualizarButton = document.createElement("button");
      atualizarButton.textContent = "Atualizar";
      atualizarButton.addEventListener("click", function () {
        const novoTipo = prompt("Digite o novo tipo da avaliação:", item.tipo);
        const novaData = prompt("Digite a nova data da avaliação:", item.data);
        const novoPeso = prompt("Digite o novo peso da avaliação:", item.peso);
        const novaTurmaDisciplinaId = prompt("Digite o novo ID da turma/disciplina:", item.turmaDisciplinaId);
        if (
          novoTipo !== null &&
          novaData !== null &&
          novoPeso !== null &&
          novaTurmaDisciplinaId !== null
        ) {
          atualizarAvaliacao(item.id, novoTipo, novaData, novoPeso, novaTurmaDisciplinaId);
        }
      });
      acoesCell.appendChild(atualizarButton);
  
      row.appendChild(acoesCell);
      tableBody.appendChild(row);
    });
  }
  