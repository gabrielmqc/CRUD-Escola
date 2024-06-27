document.addEventListener("DOMContentLoaded", function () {
    const matriculasTable = document.querySelector("#matriculasTable");
    const matriculasForm = document.querySelector("#matriculasForm");

    if (matriculasForm) {
        const alunoId = document.querySelector("#alunoIdMatricula");
        const turmaId = document.querySelector("#turmaIdMatricula");
        const dataMatricula = document.querySelector("#dataMatricula");

        matriculasForm.addEventListener("submit", function (event) {
            event.preventDefault();
            adicionarMatricula(
                dataMatricula.value,
                alunoId.value,
                turmaId.value
            );
            dataMatricula.value = "";
            alunoId.value = "";
            turmaId.value = "";
        });
    }

    fetchData("matriculas", matriculasTable);
});

function adicionarMatricula(alunoId, turmaId, dataMatricula) {
    const novaMatricula = {
      alunoId: parseInt(alunoId, 10), // Converter para número inteiro
      turmaId: parseInt(turmaId, 10), // Converter para número inteiro
      dataDeMatricula: dataMatricula // Usar o nome correto do campo
    };
  
    fetch("http://localhost:8080/matriculas", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(novaMatricula),
    })
      .then(function (res) {
        console.log(res);
        fetchData("matriculas", document.querySelector("#matriculasTable"));
      })
      .catch(function (error) {
        console.error("Erro ao adicionar matrícula:", error);
      });
  }

function removerMatricula(id) {
    fetch(`http://localhost:8080/matriculas/${id}`, {
        method: "DELETE",
    })
        .then(function (res) {
            console.log(res);
            fetchData("matriculas", document.querySelector("#matriculasTable"));
        })
        .catch(function (error) {
            console.error("Erro ao remover matrícula:", error);
        });
}

function atualizarMatricula(id, novoAlunoId, novaTurmaId, novaDataMatricula) {
    const matriculaAtualizada = {
        alunoId: novoAlunoId,
        turmaId: novaTurmaId,
        dataMatricula: novaDataMatricula,
    };

    fetch(`http://localhost:8080/matriculas/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(matriculaAtualizada),
    })
        .then(function (res) {
            console.log(res);
            fetchData("matriculas", document.querySelector("#matriculasTable"));
        })
        .catch(function (error) {
            console.error("Erro ao atualizar matrícula:", error);
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

        const alunoIdCell = document.createElement("td");
        alunoIdCell.textContent = item.alunoId;
        row.appendChild(alunoIdCell);

        const turmaIdCell = document.createElement("td");
        turmaIdCell.textContent = item.turmaId;
        row.appendChild(turmaIdCell);

        const dataMatriculaCell = document.createElement("td");
        dataMatriculaCell.textContent = item.dataMatricula;
        row.appendChild(dataMatriculaCell);

        const acoesCell = document.createElement("td");
        const removerButton = document.createElement("button");
        removerButton.textContent = "Remover";
        removerButton.addEventListener("click", function () {
            removerMatricula(item.id);
        });
        acoesCell.appendChild(removerButton);

        const atualizarButton = document.createElement("button");
        atualizarButton.textContent = "Atualizar";
        atualizarButton.addEventListener("click", function () {
            const novoAlunoId = prompt("Digite o novo ID do aluno:", item.alunoId);
            const novaTurmaId = prompt("Digite o novo ID da turma:", item.turmaId);
            const novaDataMatricula = prompt("Digite a nova data de matrícula:", item.dataMatricula);
            if (
                novoAlunoId !== null &&
                novaTurmaId !== null &&
                novaDataMatricula !== null
            ) {
                atualizarMatricula(item.id, novoAlunoId, novaTurmaId, novaDataMatricula);
            }
        });
        acoesCell.appendChild(atualizarButton);

        row.appendChild(acoesCell);
        tableBody.appendChild(row);
    });
}
