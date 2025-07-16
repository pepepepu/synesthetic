# 🎶 Synesthetic ✨

Você já se perguntou qual a "cor" de _Bohemian Rhapsody_? Ou qual a "forma" daquele heavy metal que seu vizinho insiste em ouvir às 7 da manhã? Não? Bom, eu me perguntei. E como aparentemente eu tinha muito tempo livre, decidi criar esta aplicação.

O **Synesthetic** é uma tentativa audaciosa (leia-se: fadada ao fracasso) de traduzir a música que você está ouvindo no Spotify em animações abstratas e hipnotizantes. A gente pega dados como BPM, energia e "dançabilidade" da sua música e transforma em um show de luzes particular na sua tela.

É basicamente sinestesia, mas sem precisar de anos de terapia ou substâncias questionáveis. 😵‍💫

---

## 🤔 Mas Por Quê?

Porque encarar a capa estática de um álbum é entediante. Porque eu queria uma desculpa para mexer com APIs. E, principalmente, porque a frase "vou traduzir o som em cores" soa muito mais inteligente do que "vou fazer umas bolinhas dançarem na tela".

A ideia é simples:

1.  **Você loga** com sua conta do Spotify (sim, eu vou ver seu gosto musical duvidoso).
2.  **Eu pego sua música** atual e peço ao Spotify para me contar todos os segredos dela.
3.  **Magia acontece**: Um algoritmo, escrito com café e código espaguete, usa esses dados para gerar formas, cores e movimentos.
4.  **Você encara a tela** e se pergunta se a animação de _Baby Shark_ é realmente uma obra de arte. (Spoiler: é.)

---

## 🛠️ Tecnologias Utilizadas (O Arsenal)

Este projeto foi construído com as ferramentas mais brilhantes e da moda, porque sou desses.

- **React**: Porque é o padrão, e eu gosto de sofrer com hooks.
- **Vite**: Para o build ser mais rápido que a minha vontade de abandonar o projeto.
- **TypeScript**: Para que o `undefined is not a function` apareça antes de ir para produção.
- **Spotify API**: A fonte de toda a verdade sobre seu gosto musical.
- **React Router DOM**: Para você se perder entre as três telas que a aplicação tem.
- **Sass/CSS**: Para deixar as coisas bonitas, ou pelo menos, não totalmente horríveis.

---

## 🚀 Como Executar essa Obra de Arte (ou Desastre)

Acha que consegue fazer melhor? Ou só quer ver o circo pegar fogo? Siga os passos abaixo.

### Pré-requisitos

- **Node.js**: Versão 18 ou superior. Se você não sabe o que é, talvez seja melhor parar por aqui.
- **Conta no Spotify**: E uma conta de desenvolvedor no [Spotify for Developers](https://developer.spotify.com/dashboard/). Sim, você vai ter que clicar em coisas.
- **Bom gosto musical**: Opcional, mas altamente recomendado.

### Passo a Passo

1.  **Clone este repositório (ou roube o código, não vou julgar):**

    ```bash
    git clone https://github.com/pepepepu/synesthetic.git
    cd synesthetic
    ```

2.  **Instale as dependências (a parte chata):**

    ```bash
    npm install
    ```

3.  **Crie seu arquivo de segredos (`.env`):**
    Crie um arquivo chamado `.env` na raiz do projeto. É aqui que você vai colocar suas chaves para eu não roubá-las. Copie o conteúdo abaixo e preencha com suas informações obtidas no dashboard do Spotify.

    ```env
    # Substitua pelo seu Client ID do Spotify
    VITE_SPOTIFY_CLIENT_ID="SEU_CLIENT_ID_SUPER_SECRETO"

    # URI de redirecionamento (tem que ser a mesma no seu dashboard!)
    VITE_SPOTIFY_REDIRECT_URI="http://localhost:5173/callback"

    # Endpoint de autorização do Spotify
    VITE_SPOTIFY_AUTH_ENDPOINT="https://accounts.spotify.com/authorize"
    ```

    **AVISO:** Não cometa o erro de principiante de subir esse arquivo para o GitHub. Sério.

4.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

5.  **Reze e acesse `http://localhost:5173` no seu navegador.**
    Se tudo explodir, parabéns\! Você encontrou um bug. Se funcionar, uau, estou tão surpreso quanto você.

---

## 🤝 Quer Ajudar?

Se você encontrou um bug, tem uma ideia genial ou simplesmente corrigiu um erro de digitação neste `README`, sinta-se à vontade para contribuir\!

1.  Faça um **Fork** do projeto.
2.  Crie uma nova **Branch** (`git checkout -b feature/minha-ideia-incrivel`).
3.  Faça suas alterações e **Commite** (`git commit -m 'Adicionei uma feature que finalmente faz isso funcionar direito'`).
4.  Envie para a sua branch (`git push origin feature/minha-ideia-incrivel`).
5.  Abra um **Pull Request**.

Prometo que vou olhar (eventualmente).

---

## 👨‍💻 O Culpado por Trás do Código

Se algo deu errado, ou (num cenário altamente improvável) você quer me parabenizar, aqui estão minhas informações de contato. Use com moderação.

- **Email**: [spedrobreno.2012@hotmail.com](mailto:spedrobreno.2012@hotmail.com)
- **LinkedIn**: [Pedro Oliveira](https://www.linkedin.com/in/pp-oliveira/)

---

## 📜 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações. Basicamente, você pode fazer o que quiser com isso, mas se você ficar milionário, lembre-se de mim.
