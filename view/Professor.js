document.addEventListener("DOMContentLoaded", function () {
  const professoresTable = document.querySelector("#professoresTable");
  const professoresForm = document.querySelector("#professoresForm");

  if (professoresForm) {
    const nome = document.querySelector("#nomeProfessor");
    const email = document.querySelector("#emailProfessor");
    const cpf = document.querySelector("#cpfProfessor");
    const rg = document.querySelector("#rgProfessor");
    const titulacao = document.querySelector("#titulacao");
    const dataContratacao = document.querySelector("#dataContratacao");

    professoresForm.addEventListener("submit", function (event) {
      event.preventDefault();
      adicionarProfessor(
        nome.value,
        email.value,
        cpf.value,
        rg.value,
        titulacao.value,
        dataContratacao.value
      );
      nome.value = "";
      email.value = "";
      cpf.value = "";
      rg.value = "";
      titulacao.value = "";
      dataContratacao.value = "";
    });
  }

  fetchData("professores", professoresTable);
});

function adicionarProfessor(nome, email, cpf, rg, titulacao, dataContratacao) {
  const novoProfessor = {
    nome: nome,
    email: email,
    cpf: cpf,
    rg: rg,
    titulacao: titulacao,
    dataContratacao: dataContratacao,
  };

  fetch("http://localhost:8080/professores", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(novoProfessor),
  })
    .then(function (res) {
      console.log(res);
      fetchData("professores", document.querySelector("#professoresTable"));
    })
    .catch(function (error) {
      console.error("Erro ao adicionar professor:", error);
    });
}