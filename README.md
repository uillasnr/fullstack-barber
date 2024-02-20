⭐ Sobre o Projeto
Este projeto é uma aplicação desenvolvida durante o evento Full Stack Week, um evento gratuito organizado pelo Full Stack Club (https://fullstackclub.com.br/). Foi construído utilizando as seguintes tecnologias:

NextJS
ReactJS
Prisma ORM
Autenticação com o Google
🎯 Objetivo
O objetivo principal é criar uma aplicação para o controle de agendamentos de uma barbearia.

📑 Funcionalidades:

Agendamento
Cancelamento do Agendamento
▶️ Como rodar a aplicação
⚠️ Pré-Requisitos:
A aplicação utiliza autenticação com Google OAuth, portanto, é necessário configurar o OAuth 2.0 para autenticação. Além disso, é preciso ter um banco de dados configurado para a aplicação.

✔️ Clonando o Projeto:
No terminal, clone o projeto utilizando o comando:

bash
Copy code
git clone https://github.com/uillasnr/fullstack-barber.git
🔧 Variáveis de Ambiente:
Na raiz do projeto, crie o arquivo .env e preencha-o com as seguintes informações:

makefile
Copy code
DATABASE_URL="postgresql://usuario:senha@ip:porta/banco"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
🔧 Criação das Tabelas do Banco:
Para criar as tabelas, execute o seguinte comando para executar as migrações:

Copy code
npx prisma migrate dev
🔧 Populando o Banco de Dados:
O projeto já inclui um pré-cadastro com informações como barbearias, serviços, etc. Para popular o banco de dados com essas informações, execute o comando:

Copy code
npx prisma db seed
▶️ Executando a aplicação:

Acesse a pasta raiz do projeto e instale as dependências utilizando o comando:
Copy code
npm install
Após instalar as dependências, inicie o projeto com o comando:
sql
Copy code
npm start