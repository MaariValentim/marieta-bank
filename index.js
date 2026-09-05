const { select, input } = require('@inquirer/prompts');
const chalk = require('chalk');
const fs = require('fs');

console.log('Iniciamos o Marieta Bank!');

async function operation() {
  const answer = await select({
    message: 'O que você deseja fazer?',
    choices: [
      { name: 'Criar Conta', value: 'Criar Conta' },
      { name: 'Consultar Saldo', value: 'Consultar Saldo' },
      { name: 'Depositar', value: 'Depositar' },
      { name: 'Sacar', value: 'Sacar' },
      { name: 'Sair', value: 'Sair' },
    ],
  });

  if (answer === 'Criar Conta') {
    createAccount();
  } else if (answer === 'Consultar Saldo') {
    getAccountBalance();
  } else if (answer === 'Depositar') {
    deposit();
  } else if (answer === 'Sacar') {
    withdraw();
  } else if (answer === 'Sair') {
    console.log(chalk.bgBlue.black('Obrigada por usar o Marieta Bank!'));
    process.exit(0);
  }
}

operation();

function createAccount() {
  console.log(chalk.bgGreen.black('Parabéns por escolher o Marieta Bank!'));
  console.log(chalk.green('Defina as opções da sua conta a seguir:'));

  buildAccount();
}

async function buildAccount() {
  const accountName = await input({
    message: 'Digite um nome para criar a sua conta:',
  });

  if (!accountName.trim()) {
    console.log(chalk.bgRed.black('O nome da conta não pode ficar vazio.'));
    return buildAccount();
  }

  if (!fs.existsSync('accounts')) {
    fs.mkdirSync('accounts');
  }

  if (fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome.'));
    return buildAccount();
  }

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify({ balance: 0 }, null, 2)
  );

  console.log(chalk.green('Parabéns, a sua conta foi criada!'));

  operation();
}

async function getAccountBalance() {
  const accountName = await input({
    message: 'Qual é o nome da sua conta?',
  });

  if (!checkAccount(accountName)) {
    return operation();
  }

  const accountPath = `accounts/${accountName}.json`;
  const accountData = JSON.parse(fs.readFileSync(accountPath, 'utf8'));

  console.log(
    chalk.bgBlue.black(
      `O saldo da conta ${accountName} é R$ ${accountData.balance.toFixed(2)}.`
    )
  );

  operation();
}

//Função que realiza o depósito na conta.
async function deposit() {
  const accountName = await input({
    message: 'Qual o nome da sua conta?',
  });

  if (!checkAccount(accountName)) { // verifica se a conta existe e pergunta o nome novamente
    return deposit();  
  }
  const amountText = await input({
    message: 'Qual valor você deseja depositar?',
  });

  const amount = Number(amountText.replace(',', '.'));
// Verifica se o valor é um número válido e maior que zero
  if (!Number.isFinite(amount) || amount <= 0) {
    console.log(chalk.bgRed.black('Digite um valor válido maior que zero.'));
    return deposit();
  }
// Adiciona o valor ao saldo da conta
  addAmount(accountName, amount);
}

//Função que verifica se a conta existe.
function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'));
    return false;
  }

  return true;
}

//Função que adiciona o valor ao saldo da conta.
function addAmount(accountName, amount) {
  const accountPath = `accounts/${accountName}.json`;

  const accountData = JSON.parse(
    fs.readFileSync(accountPath, 'utf8')
  );

  accountData.balance += amount;

  fs.writeFileSync(
    accountPath,
    JSON.stringify(accountData, null, 2)
  );

  console.log(
    chalk.bgGreen.black(
      `Depósito de R$ ${amount.toFixed(2)} realizado com sucesso!`
    )
  );
}

// Mostra o saldo da conta para o usuário.
async function getAccountBalance() {
  const accountName = await input({
    message: 'Qual o nome da conta?',
  });

  if (!checkAccount(accountName)) {
    return getAccountBalance();
  }

  const accountData = JSON.parse(
    fs.readFileSync(`accounts/${accountName}.json`, 'utf8')
  );

  console.log(
    chalk.bgGreen.black(
      `O saldo da sua conta é R$ ${accountData.balance.toFixed(2)}`
    )
  );

  operation();
}

//Saque

async function withdraw() {
  const accountName = await input({
    message: 'Qual o titular da conta?',
  });

  if (!checkAccount(accountName)) {
    return withdraw();
  }

  const amountText = await input({
    message: 'Qual valor você deseja sacar?',
  });

  const amount = Number(amountText.replace(',', '.'));

  if (!Number.isFinite(amount) || amount <= 0) {
    console.log(chalk.bgRed.black('Digite um valor válido maior que zero.'));
    return withdraw();
  }

  const accountPath = `accounts/${accountName}.json`;
  const accountData = JSON.parse(fs.readFileSync(accountPath, 'utf8'));

  if (amount > accountData.balance) {
    console.log(chalk.bgRed.black('Saldo insuficiente para realizar o saque.'));
    return withdraw();
  }

  accountData.balance -= amount;

  fs.writeFileSync(
    accountPath,
    JSON.stringify(accountData, null, 2)
  );

  console.log(
    chalk.bgGreen.black(
      `Saque de R$ ${amount.toFixed(2)} realizado com sucesso!`
    )
  );

  operation();
}