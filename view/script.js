/*function openTab(evt, tabName) {
  var i, tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  var tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('alunosForm').addEventListener('submit', addAluno);
  document.getElementById('notasForm').addEventListener('submit', addNota);
  document.getElementById('funcionarioForm').addEventListener('submit', addFuncionario);

  fetchAlunos();
  fetchNotas();
  fetchCursos();
  fetchTurmas();
  fetchProfessores();
  fetchDisciplinas();
});
function addEscola(event) {
  event.preventDefault();
  var formData = new FormData(document.getElementById("escolaForm"));
  var data = {

  };
  formData.forEach(function(value, key){
    data[key] = value;
  });

  fetch('http://localhost:8080/cursos',  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      console.log('Curso adicionado com sucesso!');
      document.getElementById("escolaForm").reset();
    } else {
      response.json().then(error => {
        console.error('Erro ao adicionar curso:', error);
      });
    }
  })
  .catch(error => console.error('Erro ao adicionar curso:', error));
}
function addAluno(event) {
  event.preventDefault();
  var formData = new FormData(document.getElementById('alunosForm'));
  var data = {};
  formData.forEach((value, key) => data[key] = value);

  fetch('http://localhost:8080/alunos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      console.log('Aluno adicionado com sucesso!');
      document.getElementById('alunosForm').reset();
      fetchAlunos();
    } else {
      return response.json().then(error => {
        console.error('Erro ao adicionar aluno:', error);
      });
    }
  })
  .catch(error => console.error('Erro ao adicionar aluno:', error));
}

function addNota(event) {
  event.preventDefault();
  var formData = new FormData(document.getElementById('notasForm'));
  var data = {};
  formData.forEach((value, key) => data[key] = value);

  fetch('http://localhost:8080/notas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      console.log('Nota adicionada com sucesso!');
      document.getElementById('notasForm').reset();
      fetchNotas();
    } else {
      return response.json().then(error => {
        console.error('Erro ao adicionar nota:', error);
      });
    }
  })
  .catch(error => console.error('Erro ao adicionar nota:', error));
}

function addFuncionario(event) {
  event.preventDefault();
  var formData = new FormData(document.getElementById('funcionarioForm'));
  var data = {};
  formData.forEach((value, key) => data[key] = value);

  fetch('http://localhost:8080/professores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      console.log('Funcionário adicionado com sucesso!');
      document.getElementById('funcionarioForm').reset();
      fetchProfessores();
    } else {
      return response.json().then(error => {
        console.error('Erro ao adicionar funcionário:', error);
      });
    }
  })
  .catch(error => console.error('Erro ao adicionar funcionário:', error));
}

function fetchAlunos() {
  fetch('http://localhost:8080/alunos')
    .then(response => response.json())
    .then(data => {
      console.log('Dados dos Alunos:', data);
    })
    .catch(error => console.error('Erro ao buscar alunos:', error));
}

function fetchNotas() {
  fetch('http://localhost:8080/notas')
    .then(response => response.json())
    .then(data => {
      console.log('Dados das Notas:', data);
    })
    .catch(error => console.error('Erro ao buscar notas:', error));
}

function fetchCursos() {
  fetch('http://localhost:8080/cursos')
    .then(response => response.json())
    .then(data => {
      console.log('Dados dos Cursos:', data);
    })
    .catch(error => console.error('Erro ao buscar cursos:', error));
}

function fetchTurmas() {
  fetch('http://localhost:8080/turmas')
    .then(response => response.json())
    .then(data => {
      console.log('Dados das Turmas:', data);
    })
    .catch(error => console.error('Erro ao buscar turmas:', error));
}

function fetchProfessores() {
  fetch('http://localhost:8080/professores')
    .then(response => response.json())
    .then(data => {
      console.log('Dados dos Professores:', data);
    })
    .catch(error => console.error('Erro ao buscar professores:', error));
}

function fetchDisciplinas() {
  fetch('http://localhost:8080/disciplinas')
    .then(response => response.json())
    .then(data => {
      console.log('Dados das Disciplinas:', data);
    })
    .catch(error => console.error('Erro ao buscar disciplinas:', error));
}
*/