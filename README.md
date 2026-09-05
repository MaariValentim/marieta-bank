#  Marieta Bank

Sistema bancário desenvolvido em **Node.js**, executado diretamente pelo terminal.

O projeto foi desenvolvido como parte dos meus estudos em **JavaScript e Node.js**, com o objetivo de praticar conceitos fundamentais de desenvolvimento backend, manipulação de arquivos, persistência de dados e interação com o usuário.

##  Funcionalidades

O Marieta Bank possui um menu interativo com as seguintes operações:

* Criar conta
* Consultar saldo
* Realizar depósito
* Realizar saque
* Encerrar o sistema

As contas são armazenadas localmente em arquivos `.json`, utilizando o módulo nativo `fs` do Node.js.

##  Tecnologias utilizadas

* **Node.js**
* **JavaScript**
* **@inquirer/prompts**
* **Chalk**
* **File System (fs)**
* **JSON**

##  Conceitos praticados

Durante o desenvolvimento do projeto foram praticados conceitos importantes de JavaScript e Node.js, como:

* Funções
* Funções assíncronas
* `async/await`
* Condicionais
* Validação de dados
* Conversão de valores
* Módulos do Node.js
* Manipulação de arquivos com `fs`
* Leitura e escrita de arquivos JSON
* Persistência de dados
* Uso de pacotes externos com npm
* Interação com o terminal

##  Estrutura do projeto

```text
marieta-bank/
├── accounts/
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

A pasta `accounts/` é criada automaticamente pelo sistema quando uma nova conta é cadastrada.

Os dados das contas são armazenados em arquivos JSON.

Exemplo:

```json
{
  "balance": 150.50
}
```

##  Como executar

### 1. Clone o repositório

```bash
git clone git@github.com:MaariValentim/marieta-bank.git
```

### 2. Acesse a pasta

```bash
cd marieta-bank
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npm start
```

##  Exemplo de utilização

Ao iniciar o sistema, o usuário encontrará um menu interativo:

```text
Iniciamos o Marieta Bank!

? O que você deseja fazer?
❯ Criar Conta
  Consultar Saldo
  Depositar
  Sacar
  Sair
```

Após criar uma conta, o usuário pode consultar o saldo, realizar depósitos e efetuar saques.

## Objetivo

Este projeto representa uma etapa dos meus estudos em **JavaScript e Node.js**, com foco no desenvolvimento backend.

A aplicação foi construída utilizando arquivos JSON como forma de persistência, permitindo praticar conceitos fundamentais antes da evolução para soluções envolvendo banco de dados e APIs.

## Próximas melhorias

* [ ] Criar histórico de transações
* [ ] Adicionar data e hora às operações
* [ ] Implementar transferência entre contas
* [ ] Adicionar autenticação
* [ ] Melhorar as validações
* [ ] Separar o projeto em módulos
* [ ] Utilizar banco de dados
* [ ] Criar uma API REST
* [ ] Adicionar testes automatizados
* [ ] Documentar a API

---

## Sobre o projeto

Projeto desenvolvido por **Mariana Valentim** como parte dos meus estudos em desenvolvimento backend com JavaScript e Node.js.
