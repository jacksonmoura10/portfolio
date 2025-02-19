document.addEventListener('DOMContentLoaded', function () {
  // Menu mobile
 

  // Projetos do GitHub
  async function getprojects() {
    const urlgithub = 'https://api.github.com/users/jacksonmoura10/repos'; // Corrigido o endpoint

    try {
      const response = await fetch(urlgithub, { method: 'GET' });
      if (response.ok) {
        const projects = await response.json();
        const projectsContainer = document.getElementById('my-projects-list');
        projectsContainer.innerHTML = ''; // Limpa qualquer conteúdo anterior
        projects.forEach(project => {
          const projectElement = document.createElement('div');
          projectElement.classList.add('project');
          projectElement.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description || 'Sem descrição'}</p>
            <a href="${project.html_url}" target="_blank">Ver projeto</a>
          `;
          projectsContainer.appendChild(projectElement);
        });
      } else {
        console.error('Erro ao buscar projetos:', response.status);
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    }
  }

  // Chama os projetos do GitHub
  getprojects();

  // Formulário de contato
  document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    const form = e.target;
    const formData = new FormData(form); // Dados do formulário
    const formMessages = document.getElementById("form-messages");

    try {
      const response = await fetch("https://formspree.io/f/mpwwjggv", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json", // Define o cabeçalho esperado
        },
      });

      if (response.ok) {
        formMessages.innerHTML = "<p style='color: green;'>Mensagem enviada com sucesso!</p>";
        form.reset(); // Limpa o formulário após o envio
      } else {
        formMessages.innerHTML = "<p style='color: red;'>Erro: Verifique os campos e tente novamente.</p>";
      }
    } catch (error) {
      formMessages.innerHTML = `<p style='color: red;'>Erro de conexão: ${error.message}</p>`;
    }
  });
});

