# Marieta Bank

Um sistema bancário simples desenvolvido em **Node.js**, executado diretamente pelo terminal.

Este projeto foi desenvolvido com o objetivo de praticar conceitos fundamentais de JavaScript e Node.js, como funções assíncronas, manipulação de arquivos, módulos, entrada de dados pelo terminal e lógica de programação.

## Funcionalidades

O sistema possui um menu interativo com as seguintes opções:

* Criar uma conta
* Consultar saldo
* Realizar depósito
* Realizar saque
* Sair do sistema

As contas são armazenadas localmente em arquivos `.json`, utilizando o módulo nativo `fs` do Node.js.

## Tecnologias utilizadas

* **Node.js**
* **JavaScript**
* **@inquirer/prompts**
* **Chalk**
* **File System (fs)**

## Conceitos praticados

Durante o desenvolvimento foram praticados conceitos como:

* Funções
* Funções assíncronas (`async/await`)
* Condicionais
* Validação de dados
* Manipulação de strings
* Conversão de valores
* Módulos do Node.js
* Manipulação de arquivos com `fs`
* Leitura e escrita de arquivos JSON
* Estruturação de dados
* Tratamento de entradas do usuário
* Uso de pacotes externos com npm

## 📂 Estrutura do projeto

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

Cada conta é armazenada em um arquivo JSON contendo o saldo da conta.

Exemplo:

```json
{
  "balance": 150.50
}
```

## ⚙️ Como executar

### 1. Clone o repositório

```bash
git clone SEU_LINK_DO_REPOSITORIO
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
node index.js
```

## Exemplo de utilização

Ao iniciar o sistema, o usuário verá um menu semelhante a:

```text
Iniciamos o Marieta Bank!

? O que você deseja fazer?
❯ Criar Conta
  Consultar Saldo
  Depositar
  Sacar
  Sair
```
Após criar uma conta, é possível consultar o saldo, realizar depósitos e efetuar saques.

## Objetivo do projeto

Este projeto faz parte dos meus estudos em **JavaScript e Node.js**, com foco no desenvolvimento backend.
A ideia foi construir uma aplicação simples utilizando recursos fundamentais do Node.js, sem banco de dados externo, utilizando arquivos JSON para persistência das informações.

##  Próximas melhorias

Algumas funcionalidades que podem ser implementadas futuramente:

* [ ] Criar histórico de transações
* [ ] Adicionar data e hora às operações
* [ ] Implementar transferência entre contas
* [ ] Adicionar autenticação
* [ ] Melhorar as validações
* [ ] Separar o projeto em módulos
* [ ] Utilizar um banco de dados
* [ ] Criar uma API REST
* [ ] Adicionar testes automatizados

---

### Projeto desenvolvido para fins de estudo

**Marieta Bank** — meu primeiro projeto de sistema bancário utilizando Node.js.
# marienta-bank
