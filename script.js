document.addEventListener("DOMContentLoaded", async function () {
    const username = "jacksonmoura10";
    const projetosContainer = document.getElementById("projetos");

    // Efeito de digitação do nome
    const texto = "Jackson Moura.";
    let i = 0;
    function digitar() {
        if (i < texto.length) {
            document.getElementById("typed").innerHTML += texto.charAt(i);
            i++;
            setTimeout(digitar, 150);
        }
    }
    digitar();

    // Mapeando os projetos com suas imagens correspondentes
    const sitesPublicados = {
        "calculadora": {
            link: "https://jacksonmoura10.github.io/calculadora/",
            imagem: "assets/calculadora.png"
        },
        "Convert-Money": {
            link: "https://jacksonmoura10.github.io/Convert-Money/",
            imagem: "assets/Convert-Money.png"
        },
        "WE-CARE": {
            link: "https://jacksonmoura10.github.io/WE-CARE/",
            imagem: "assets/we-care.png"
        },
        "sorteador": {
            link: "https://jacksonmoura10.github.io/sorteador/",
            imagem: "assets/sorteador.png"
        },
        "jacksonmoura10": {
            link: "https://jacksonmoura10.github.io/jacksonmoura10/",
            imagem: "assets/readme.png"
        },
        "irmaos-mario": {
            link: "https://jacksonmoura10.github.io/irmaos-mario/",
            imagem: "assets/mario.png"
        },
    };

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) throw new Error("Erro ao buscar repositórios.");

        const repos = await response.json();

        projetosContainer.innerHTML = ""; // Limpa antes de adicionar os projetos

        repos.forEach(repo => {
            // Ignora o repositório do portfólio
            if (repo.name === "portfolio") return;

            // Capitalizando a primeira letra de cada palavra
            const nomeProjeto = repo.name
                .split("-")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            const projetoInfo = sitesPublicados[repo.name] || {
                link: repo.html_url,
                imagem: "assets/default.png"
            };

            const card = document.createElement("div");
            card.classList.add("projeto");
            card.innerHTML = `
                <img class="img-projeto" src="${projetoInfo.imagem}" alt="${nomeProjeto}" onerror="this.src='assets/default.png'">
                <div class="info-projeto">
                    <h3>${nomeProjeto}</h3>
                    <p>${repo.description ? repo.description : "Sem descrição disponível."}</p>
                </div>
                <a href="${projetoInfo.link}" target="_blank">Ver Projeto</a>
            `;

            projetosContainer.appendChild(card);
        });

    } catch (error) {
        projetosContainer.innerHTML = "<p>Erro ao carregar projetos.</p>";
        console.error(error);
    }
});



