document.addEventListener("DOMContentLoaded", function () {
  const alunosBtn = document.querySelector("#alunosBtn");
  const cursosBtn = document.querySelector("#cursosBtn");
  const salasBtn = document.querySelector("#salasBtn");
  const professoresBtn = document.querySelector("#professoresBtn");
  const avaliacoesBtn = document.querySelector("#avaliacoesBtn");
  const horariosBtn = document.querySelector("#horariosBtn");
  const disciplinasBtn = document.querySelector("#disciplinasBtn");
  const matriculasBtn = document.querySelector("#matriculasBtn");
  const turmasBtn = document.querySelector("#turmasBtn");

  const alunosTable = document.querySelector("#alunosTable");
  const cursosTable = document.querySelector("#cursosTable");
  const salasTable = document.querySelector("#salasTable");
  const professoresTable = document.querySelector("#professoresTable");
  const avaliacoesTable = document.querySelector("#avaliacoesTable");
  const horariosTable = document.querySelector("#horariosTable");
  const disciplinasTable = document.querySelector("#disciplinasTable");
  const matriculasTable = document.querySelector("#matriculasTable");
  const turmasTable = document.querySelector("#turmasTable");

  alunosBtn.addEventListener("click", function () {
    toggleTable(alunosTable, "alunos");
  });

  cursosBtn.addEventListener("click", function () {
    toggleTable(cursosTable, "cursos");
  });

  salasBtn.addEventListener("click", function () {
    toggleTable(salasTable, "salas");
  });

  professoresBtn.addEventListener("click", function () {
    toggleTable(professoresTable, "professores");
  });

  avaliacoesBtn.addEventListener("click", function () {
    toggleTable(avaliacoesTable, "avaliacoes");
  });

  horariosBtn.addEventListener("click", function () {
    toggleTable(horariosTable, "horarios");
  });

  disciplinasBtn.addEventListener("click", function () {
    toggleTable(disciplinasTable, "disciplinas");
  });

  matriculasBtn.addEventListener("click", function () {
    toggleTable(matriculasTable, "matriculas");
  });

  turmasBtn.addEventListener("click", function () {
    toggleTable(turmasTable, "turmas");
  });
});


function toggleTable(table, endpoint) {
  if (table.style.display === "none") {
    table.style.display = "table";
    fetchData(endpoint, table);
  } else {
    table.style.display = "none";
  }
}

function fetchData(endpoint, table) {
  const tableBody = table.querySelector("tbody");
  if (tableBody) {
    fetch(`http://localhost:8080/${endpoint}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        tableBody.innerHTML = "";
        data.forEach(function (item, index) {
          const row = document.createElement("tr");
          row.dataset.id = item.id;
          let rowHTML = "";

          switch (endpoint) {
            case "alunos":
              rowHTML = `
                <td><input type="text" value="${item.nome}"></td>
                <td><input type="text" value="${item.dataDeNascimento}"></td>
                <td><input type="text" value="${item.endereco}"></td>
                <td><input type="text" value="${item.telefone}"></td>
                <td><input type="text" value="${item.email}"></td>
                <td><input type="text" value="${item.cpf}"></td>
                <td><input type="text" value="${item.rg}"></td>
                <td><input type="text" value="${item.dataMatricula}"></td>
                <td>
                  <div class="action-buttons">
                    <button class="delete-btn">Excluir</button>
                    <button class="confirm-btn">Confirmar</button>
                  </div>
                </td>
              `;
              break;
            case "cursos":
              rowHTML = `<td><input type="text" value="${item.nome}"></td><td><div class="action-buttons"><button class="delete-btn">Excluir</button><button class="confirm-btn">Confirmar</button></div></td>`;
              break;
            case "salas":
              rowHTML = `
                <td><input type="text" value="${item.nome}"></td>
                <td><input type="text" value="${item.capacidade}"></td>
                <td><div class="action-buttons"><button class="delete-btn">Excluir</button><button class="confirm-btn">Confirmar</button></div></td>
              `;
              break;
            case "professores":
              rowHTML = `
                <td><input type="text" value="${item.nome}"></td>
                <td><input type="text" value="${item.email}"></td>
                <td><input type="text" value="${item.cpf}"></td>
                <td><input type="text" value="${item.rg}"></td>
                <td><input type="text" value="${item.titulacao}"></td>
                <td><input type="text" value="${item.dataContratacao}"></td>
                <td><div class="action-buttons"><button class="delete-btn">Excluir</button><button class="confirm-btn">Confirmar</button></div></td>
              `;
              break;
            case "avaliacoes":
              rowHTML = `
                <td><input type="text" value="${item.tipo}"></td>
                <td><input type="text" value="${item.data}"></td>
                <td><input type="text" value="${item.peso}"></td>
                <td><div class="action-buttons"><button class="delete-btn">Excluir</button><button class="confirm-btn">Confirmar</button></div></td>
              `;
              break;
            case "horarios":
              rowHTML = `
                <td><input type="text" value="${item.diaSemana}"></td>
                <td><input type="text" value="${item.dataInicio}"></td>
                <td><input type="text" value="${item.horaInicio}"></td>
                <td><input type="text" value="${item.dataFim}"></td>
                <td><input type="text" value="${item.horaFim}"></td>
                <td><div class="action-buttons"><button class="delete-btn">Excluir</button><button class="confirm-btn">Confirmar</button></div></td>
              `;
              break;
            case "disciplinas":
              rowHTML = `
                <td><input type="text" value="${item.nome}"></td>
                <td><input type="text" value="${item.cargaHoraria}"></td>
                <td><div class="action-buttons"><button class="delete-btn">Excluir</button><button class="confirm-btn">Confirmar</button></div></td>
              `;
              break;
            case "matriculas":
              rowHTML = `
              <td><input type="text" value="${item.aluno}"></td>
              <td><input type="text" value="${item.turma}"></td>
              <td><input type="text" value="${item.dataMatricula}"></td>
              <td><div class="action-buttons"><button class="delete-btn">Excluir</button><button class="confirm-btn">Confirmar</button></div></td>
              `
              break;
            case "turmas":
              rowHTML = `
              <td><input type="text" value="${item.anoLetivo}"></td>
              <td><input type="text" value="${item.turno}"></td>
              <td><input type="text" value="${item.semestre}"></td>
              <td><div class="action-buttons"><button class="delete-btn">Excluir</button><button class="confirm-btn">Confirmar</button></div></td>
              `
          }

          row.innerHTML = rowHTML;
          tableBody.appendChild(row);

          const acoesCell = row.querySelector("td:last-child");
          const actionButtonsDiv = acoesCell.querySelector(".action-buttons");

          // Remover o botão de confirmação existente, se houver
          const confirmButton = actionButtonsDiv.querySelector(".confirm-btn");
          if (confirmButton) {
            actionButtonsDiv.removeChild(confirmButton);
          }

          // Adicionar event listener para atualizar dados
          row.querySelectorAll("input").forEach(function (input) {
            input.addEventListener("change", function () {
              const confirmButton = actionButtonsDiv.querySelector(".confirm-btn");
              if (!confirmButton) {
                const newConfirmButton = document.createElement("button");
                newConfirmButton.textContent = "Confirmar";
                newConfirmButton.classList.add("confirm-btn");
                newConfirmButton.addEventListener("click", function () {
                  updateData(endpoint, row);
                  actionButtonsDiv.removeChild(newConfirmButton);
                });
                actionButtonsDiv.appendChild(newConfirmButton);
              }
            });
          });


          // Adicionar event listener para excluir linha
          row.querySelector(".delete-btn").addEventListener("click", function () {
            deleteData(endpoint, row.dataset.id);
          });
        });
      });
  }
}



function updateData(endpoint, row) {
  const itemId = row.dataset.id;
  const updatedData = {};

  // Construir objeto com os novos dados
  row.querySelectorAll("input").forEach(function (input, index) {
    const fieldNames = getFieldNames(endpoint);
    updatedData[fieldNames[index]] = input.value;
  });

  const acoesCell = row.querySelector("td:last-child");
  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Confirmar";
  confirmButton.addEventListener("click", function () {
    fetch(`http://localhost:8080/${endpoint}/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then(function (response) {
        if (response.ok) {
          console.log(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} atualizado com sucesso!`);
          acoesCell.removeChild(confirmButton); // Remover o botão após a atualização
        } else {
          console.error(`Erro ao atualizar ${endpoint}:`, response.status);
        }
      })
      .catch(function (error) {
        console.error(`Erro ao atualizar ${endpoint}:`, error);
      });
  });

  acoesCell.appendChild(confirmButton);
}

function deleteData(endpoint, itemId) {
  fetch(`http://localhost:8080/${endpoint}/${itemId}`, {
    method: "DELETE",
  })
    .then(function (response) {
      if (response.ok) {
        console.log(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} excluído com sucesso!`);
        fetchData(endpoint, document.querySelector(`#${endpoint}Table`));
      } else {
        console.error(`Erro ao excluir ${endpoint}:`, response.status);
      }
    })
    .catch(function (error) {
      console.error(`Erro ao excluir ${endpoint}:`, error);
    });
}

function getFieldNames(endpoint) {
  switch (endpoint) {
    case "alunos":
      return ["nome", "dataDeNascimento", "endereco", "telefone", "email", "cpf", "rg", "dataMatricula", "idTurma"];
    case "cursos":
      return ["nome"];
    case "salas":
      return ["nome", "capacidade", "horarioId"];
    case "professores":
      return ["nome", "email", "cpf", "rg", "titulacao", "dataContratacao"];
    case "notas":
      return ["valor", "data", "idAluno"];
    case "avaliacoes":
      return ["id", "tipo", "data", "peso", "turmaDisciplinaId"];
    case "horarios":
      return ["turmaDisciplinaId", "salaId", "diaSemana", "dataInicio", "horaInicio", "dataFim", "horaFim"];
    case "disciplinas":
      return ["nome", "cargaHoraria", "turmaDisciplinaId"];
    case "matriculas":
      return ["aluno", "turma", "dataMatricula"]
    case "turmas":
      return ["anoLetivo", "semestre", "turno", "cursoIdTurma"];
    default:
      return [];
  }
}
