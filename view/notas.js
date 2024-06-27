document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector("#notasForm");
  const nomeInput = document.querySelector("#nome");
  const cargaHorariaInput = document.querySelector("#cargaHoraria");
  const turmaDisciplinaId3Input = document.querySelector("#turmaDisciplinaId3");

  const adicionarAvaliacaoBtn = document.querySelector("#adicionarAvaliacaoBtn");
  const adicionarDisciplinaBtn = document.querySelector("#adicionarDisciplinaBtn");

  const avaliacoesTable = document.querySelector("#avaliacoesTable tbody");
  const horariosTable = document.querySelector("#horariosTable tbody");
  const disciplinasTable = document.querySelector("#disciplinasTable tbody");

  adicionarAvaliacaoBtn.addEventListener("click", adicionarAvaliacao);
  adicionarDisciplinaBtn.addEventListener("click", adicionarDisciplina);

  formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Impedir o envio padrão do formulário
  });

  // Buscar dados ao carregar a página
  fetchAvaliacoes();
  fetchHorarios();
  fetchDisciplinas();

  // Seção para lidar com avaliações
  function adicionarAvaliacao() {
    const novaAvaliacao = {
      tipo: tipoInput.value,
      data: dataInput.value,
      peso: pesoInput.value,
      turmaDisciplinaId: turmaDisciplinaIdInput.value,
    };

    // Validar os dados de entrada antes de enviar
    if (!validarDados(novaAvaliacao)) {
      return;
    }

    fetch("http://localhost:8080/avaliacoes", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(novaAvaliacao),
    })
      .then(function (res) {
        if (res.ok) {
          console.log("Avaliação adicionada com sucesso");
          fetchAvaliacoes(); // Atualizar tabela de avaliações após adicionar uma nova
        } else {
          console.error("Erro ao adicionar avaliação:", res.status);
        }
      })
      .catch(function (error) {
        console.error("Erro na requisição:", error);
      });
  }

  function fetchAvaliacoes() {
    if (avaliacoesTable) {
      fetch("http://localhost:8080/avaliacoes")
        .then(function (response) {
          return response.json();
        })
        .then(function (avaliacoes) {
          avaliacoesTable.innerHTML = "";
          avaliacoes.forEach(function (avaliacao) {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${avaliacao.tipo}</td>
              <td>${avaliacao.data}</td>
              <td>${avaliacao.peso}</td>
              <td>${avaliacao.turmaDisciplinaId}</td>
            `;
            avaliacoesTable.appendChild(row);
          });
        })
        .catch(function (error) {
          console.error("Erro ao buscar avaliações:", error);
        });
    }
  }

  // Seção para lidar com horários
  // Seção para lidar com disciplinas
  function adicionarDisciplina() {
    const novaDisciplina = {
      nome: nomeInput.value,
      cargaHoraria: cargaHorariaInput.value,
      turmaDisciplinaId: turmaDisciplinaId3Input.value,
    };

    // Validar os dados de entrada antes de enviar
    if (!validarDados(novaDisciplina)) {
      return;
    }

    fetch("http://localhost:8080/disciplinas", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(novaDisciplina),
    })
      .then(function (res) {
        if (res.ok) {
          console.log("Disciplina adicionada com sucesso");
          fetchDisciplinas(); // Atualizar tabela de disciplinas após adicionar uma nova
        } else {
          console.error("Erro ao adicionar disciplina:", res.status);
        }
      })
      .catch(function (error) {
        console.error("Erro na requisição:", error);
      });
  }

  function fetchDisciplinas() {
    if (disciplinasTable) {
      fetch("http://localhost:8080/disciplinas")
        .then(function (response) {
          return response.json();
        })
        .then(function (disciplinas) {
          disciplinasTable.innerHTML = "";
          disciplinas.forEach(function (disciplina) {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${disciplina.nome}</td>
              <td>${disciplina.cargaHoraria}</td>
              <td>${disciplina.turmaDisciplinaId}</td>
            `;
            disciplinasTable.appendChild(row);
          });
        })
        .catch(function (error) {
          console.error("Erro ao buscar disciplinas:", error);
        });
    }
  }
});

function validarDados(dados) {
  // Implemente a lógica de validação de dados aqui
  // Retorne true se os dados forem válidos, caso contrário, false
  return true; // Exemplo simples, sempre retorna true
}
