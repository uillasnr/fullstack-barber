  

Tópicos

🔹 Sobre o Projeto

🔹 Objetivo

🔹 Funcionalidades

🔹 Como rodar a aplicação

🔹 Backlog

⭐ Sobre o Projeto
Aplicação desenvolvida durante o evento Full Stack Week, evento gratuito organizado pelo Full Stack Club (https://fullstackclub.com.br/).

Este projeto foi desenvolvido utilizando:

✔️ NextJS

✔️ ReactJS

✔️ Prisma ORM

✔️ Autenticação com o Google

🎯 Objetivo
Desenvolvimento de uma aplicação para controle de agendamentos de uma barbearia.

📑 Funcionalidades:
✅ Agendamento ✅ Cancelamento do Agendamento

▶️ Como rodar a aplicação
⚠️ Pré-Requisitos
A aplicação foi desenvolvida utilizando Google OAuth Authentication, sendo assim será necessário configurar o OAuth 2.0 para autenticação.
Necessário possuir um banco de dados configurado para a aplicação
✔️ Clonando o Projeto
No terminal, clone o projeto:

https://github.com/uillasnr/fullstack-barber.git
🔧 Variáveis de Ambiente
Na raiz do projeto será necessário criar o arquivo .env e preenche-lo com as informações abaixo:
DATABASE_URL="postgresql:usuario:senha@ip:porta/banco"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
🔧 Criação das Tabelas do Banco
Para criação das tabelas será necessário executar o comando abaixo, que será responsavel pela criação das tabelas com base nas migrations.

npx prisma migrate dev
🔧 Populando o Banco de Dados
No projeto ja consta um pré-cadastro contendo informações como barbearias, serviços, etc

Para popular o banco de dados com estas informações é necessário executar o comando abaixo:

npx prisma db seed
▶️ Executando a aplicação
Acessar a pasta raiz do projeto e instalar as dependencias através do comando:
npm install
Após instalar as dependencias, executar o comando abaixo para iniciar o projeto:
npx expo start --clear
🎯 Backlog
🔲 Tratamento da expiração do token

