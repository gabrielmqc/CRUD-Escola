document.addEventListener("DOMContentLoaded", function () {
    const turmasTable = document.querySelector("#turmasTable");
    const turmasForm = document.querySelector("#turmasForm");
  
    if (turmasForm) {
      const anoLetivo = document.querySelector("#anoLetivo");
      const semestre = document.querySelector("#semestre");
      const turno = document.querySelector("#turno");
      const cursoIdTurma = document.querySelector("#cursoId");
  
      turmasForm.addEventListener("submit", function (event) {
        event.preventDefault();
        adicionarTurma(
          anoLetivo.value,
          semestre.value,
          turno.value,
          cursoIdTurma.value
        );
        anoLetivo.value = "";
        semestre.value = "";
        turno.value = "";
        cursoIdTurma.value = "";
      });
    }
  
    fetchData("turmas", turmasTable);
  });
  
  function adicionarTurma(anoLetivo, semestre, turno, cursoIdTurma) {
    const novaTurma = {
      anoLetivo: anoLetivo,
      semestre: semestre,
      turno: turno,
      cursoIdTurma: cursoIdTurma,
    };
  
    fetch("http://localhost:8080/turmas", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(novaTurma),
    })
      .then(function (res) {
        console.log(res);
        fetchData("turmas", document.querySelector("#turmasTable"));
      })
      .catch(function (error) {
        console.error("Erro ao adicionar turma:", error);
      });
  }
  
  function removerTurma(id) {
    fetch(`http://localhost:8080/turmas/${id}`, {
      method: "DELETE",
    })
      .then(function (res) {
        console.log(res);
        fetchData("turmas", document.querySelector("#turmasTable"));
      })
      .catch(function (error) {
        console.error("Erro ao remover turma:", error);
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
      row.dataset.id = item.id;
  
      const anoLetivoCell = document.createElement("td");
      anoLetivoCell.textContent = item.anoLetivo;
      row.appendChild(anoLetivoCell);
  
      const semestreCell = document.createElement("td");
      semestreCell.textContent = item.semestre;
      row.appendChild(semestreCell);
  
      const turnoCell = document.createElement("td");
      turnoCell.textContent = item.turno;
      row.appendChild(turnoCell);
  
      const cursoIdTurmaCell = document.createElement("td");
      cursoIdTurmaCell.textContent = item.cursoIdTurma;
      row.appendChild(cursoIdTurmaCell);
  
      const acoesCell = document.createElement("td");
      const removerButton = document.createElement("button");
      removerButton.textContent = "Remover";
      removerButton.addEventListener("click", function () {
        removerTurma(item.id);
      });
      acoesCell.appendChild(removerButton);
  
      row.appendChild(acoesCell);
      tableBody.appendChild(row);
    });
  }
  