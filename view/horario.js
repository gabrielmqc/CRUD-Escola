document.addEventListener("DOMContentLoaded", function () {
    const horariosTable = document.querySelector("#horariosTable");
    const horariosForm = document.querySelector("#horarioForm");
  
    if (horariosForm) {
      const diaSemana = document.querySelector("#diaSemana");
      const dataInicio = document.querySelector("#dataInicio");
      const horaInicio = document.querySelector("#horaInicio");
      const dataFim = document.querySelector("#dataFim");
      const horaFim = document.querySelector("#horaFim");
      const salaId = document.querySelector("#salaId");
      const turmaDisciplinaId = document.querySelector("#turmaDisciplinaId");
  
      horariosForm.addEventListener("submit", function (event) {
        event.preventDefault();
        adicionarHorario(
          diaSemana.value,
          dataInicio.value,
          horaInicio.value,
          dataFim.value,
          horaFim.value,
          salaId.value,
          turmaDisciplinaId.value
        );
        diaSemana.value = "";
        dataInicio.value = "";
        horaInicio.value = "";
        dataFim.value = "";
        horaFim.value = "";
        salaId.value = "";
        turmaDisciplinaId.value = "";
      });
    }
  
    fetchData("horarios", horariosTable);
  });
  
  function adicionarHorario(diaSemana, dataInicio, horaInicio, dataFim, horaFim, salaId, turmaDisciplinaId) {
    const novoHorario = {
      diaSemana: diaSemana,
      dataInicio: dataInicio,
      horaInicio: horaInicio,
      dataFim: dataFim,
      horaFim: horaFim,
      salaId: salaId,
      turmaDisciplinaId: turmaDisciplinaId,
    };
  
    fetch("http://localhost:8080/horarios", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(novoHorario),
    })
      .then(function (res) {
        console.log(res);
        fetchData("horarios", document.querySelector("#horariosTable"));
      })
      .catch(function (error) {
        console.error("Erro ao adicionar horário:", error);
      });
  }
  function removerHorario(id) {
    fetch(`http://localhost:8080/horarios/${id}`, {
      method: "DELETE",
    })
      .then(function (res) {
        console.log(res);
        fetchData("horarios", document.querySelector("#horariosTable"));
      })
      .catch(function (error) {
        console.error("Erro ao remover horário:", error);
      });
  }
  
  function atualizarHorario(id, novoDiaSemana, novaDataInicio, novaHoraInicio, novaDataFim, novaHoraFim) {
    const horarioAtualizado = {
      diaSemana: novoDiaSemana,
      dataInicio: novaDataInicio,
      horaInicio: novaHoraInicio,
      dataFim: novaDataFim,
      horaFim: novaHoraFim,
    };
  
    fetch(`http://localhost:8080/horarios/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(horarioAtualizado),
    })
      .then(function (res) {
        console.log(res);
        fetchData("horarios", document.querySelector("#horariosTable"));
      })
      .catch(function (error) {
        console.error("Erro ao atualizar horário:", error);
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
  
      const diaSemanaCell = document.createElement("td");
      diaSemanaCell.textContent = item.diaSemana;
      row.appendChild(diaSemanaCell);
  
      const dataInicioCell = document.createElement("td");
      dataInicioCell.textContent = item.dataInicio;
      row.appendChild(dataInicioCell);
  
      const horaInicioCell = document.createElement("td");
      horaInicioCell.textContent = item.horaInicio;
      row.appendChild(horaInicioCell);
  
      const dataFimCell = document.createElement("td");
      dataFimCell.textContent = item.dataFim;
      row.appendChild(dataFimCell);
  
      const horaFimCell = document.createElement("td");
      horaFimCell.textContent = item.horaFim;
      row.appendChild(horaFimCell);
  
      const acoesCell = document.createElement("td");
      const removerButton = document.createElement("button");
      removerButton.textContent = "Remover";
      removerButton.addEventListener("click", function () {
        removerHorario(item.id);
      });
      acoesCell.appendChild(removerButton);
  
      const atualizarButton = document.createElement("button");
      atualizarButton.textContent = "Atualizar";
      atualizarButton.addEventListener("click", function () {
        const novoDiaSemana = prompt("Digite o novo dia da semana:", item.diaSemana);
        const novaDataInicio = prompt("Digite a nova data de início:", item.dataInicio);
        const novaHoraInicio = prompt("Digite a nova hora de início:", item.horaInicio);
        const novaDataFim = prompt("Digite a nova data de fim:", item.dataFim);
        const novaHoraFim = prompt("Digite a nova hora de fim:", item.horaFim);
        if (
          novoDiaSemana !== null &&
          novaDataInicio !== null &&
          novaHoraInicio !== null &&
          novaDataFim !== null &&
          novaHoraFim !== null
        ) {
          atualizarHorario(item.id, novoDiaSemana, novaDataInicio, novaHoraInicio, novaDataFim, novaHoraFim);
        }
      });
      acoesCell.appendChild(atualizarButton);
  
      row.appendChild(acoesCell);
      tableBody.appendChild(row);
    });
  }
