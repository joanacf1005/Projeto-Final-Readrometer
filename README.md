## Projeto Final - Readrometer, Gestão de Livros

![Angular](https://img.shields.io/badge/Angular-21.2.0-emerald?logo=angular&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-blueviolet?logo=supabase&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-brightgreen?logo=docker&logoColor=white)

![CI](https://github.com/joanacf1005/Projeto-Final-Readrometer/actions/workflows/ci.yml/badge.svg)

Este projeto foi feito com recurso às tecnologias: Angular CLI version 21.2.0.

## Aluno

Aluno: Joana Freitas
UFCD: Programação JavaScript e Integração de Processos
Framework: Angular
Linguagem: TypeScript

## Descrição

Projeto Final da disciplina de Programação em JavaScript. 
Consiste numa Single Page Application desenvolvida em Angular para gerir a leitura pessoal de livros.
Permite adicionar, visualizar, editar, remover e filtrar livros. 

Armazenamento Supabase e LocalStorage. Totalmente Dockerizado e com CI/CD.

## Funcionalidades

Header:
    -Navegação para Dashboard;
    -Navegação para Galeria de livros;
    -Mudança de tema (escuro ou claro);

Dashboard: 
    -Último livro adicionado:
        -Navegação para Detalhes do Livro;
    -Kpis em tempo real:
        -Total de livros com navegação para a Galeria de Livros;
        -Total de livros lidos;
        -Total de livros a ler;
        -Total de livros a serem lidos;
        -Média de avaliação de livros lidos;

Galeria:
    -Lista todos os livros:
        -Cada livro com navegação para Detalhes do Livro;
    -Filtra por estado (a ler/lido/por ler);
    -Navegação para adicionar livros;
    -Paginação;

Detalhes do Livro:
    -Informação completa de cada livro;
    -Edição com navegação para Edição de Livro;
    -Apagar livro;
    -Navegação para Galeria de Livros;

Adicionar Livro:
    -Formulário com campos obrigatórios e informação sobre cada campo(formato);
    -Navegação de volta para a Galeria de Livros;

Armazenamento de dados em LocalStorage;

Login:
    -Armazenamento de dados login em supabase


## Instalação e execução

clonar repositório:

    git clone https://github.com/joanacf1005/Projeto-Final-Readrometer.git

Entrar na pasta do projeto:

    cd readrometer

Instalar dependências:

    npm install 

Executar a aplicação:

    ng serve --open


## Estrutura do Projeto

readrometer/
├── src/
│   ├── app/
│   │   ├── book-tracking/
│   │   │   ├── app-pages/
│   │   │   │   ├── dashboard/                 ← Último livro adicionado
│   │   │   │   ├── book-gallery/              ← Add New Book, paginação, filtros
│   │   │   │   ├── new-book/                  ← ADD/EDIT com título dinâmico
│   │   │   │   ├── book-details/              ← Detalhes, botão editar e apagar
│   │   │   │   └── dashboard-stats/           ← Estatísticas
│   │   │   ├── app.routes.ts                  ← Rotas 
│   │   │   └── services/supabase.ts
│   │   ├── shared-across-app/
│   │   │   ├── footer/                        ← Rodapé global
│   │   │   └── header/                        ← Cabeçalho global
│   │   ├── app.ts/html/scss  
│   │   └── environments/                 
│   ├── index.html                             
│   └── styles.css                             ← Global styles
├── angular.json                               
├── package.json                              
├── tsconfig.json  
├── Dockerfile
├── .github/workflows/ci.yml                        
└── README.md                                  

## Futuras Implementações

Perfil de utilizador;
Pesquisa com filtros diferentes (como categoria, nome);
Ordenação por ordem alfabética;
Mais campos de formulário;

## Demo Docker
    docker ps -> no terminal
    localhost:8080 -> no browser

