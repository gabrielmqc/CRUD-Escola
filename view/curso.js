document.addEventListener("DOMContentLoaded", function () {
    const cursosTable = document.querySelector("#cursosTable");
    const cursosForm = document.querySelector("#cursoForm");
  
    if (cursosForm) {
      const nomeCurso = document.querySelector("#nomeCurso");
  
      cursosForm.addEventListener("submit", function (event) {
        event.preventDefault();
        adicionarCurso(nomeCurso.value);
        nomeCurso.value = ""; // Limpar o campo após adicionar o curso
      });
    }
  
    fetchData("cursos", cursosTable);
  });
  
  function adicionarCurso(nome) {
    const novoCurso = {
      nome: nome,
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
        fetchData("cursos", document.querySelector("#cursosTable"));
      })
      .catch(function (error) {
        console.error("Erro ao adicionar curso:", error);
      });
  }
  
  function removerCurso(id) {
    fetch(`http://localhost:8080/cursos/${id}`, {
      method: "DELETE",
    })
      .then(function (res) {
        console.log(res);
        fetchData("cursos", document.querySelector("#cursosTable"));
      })
      .catch(function (error) {
        console.error("Erro ao remover curso:", error);
      });
  }
  
  