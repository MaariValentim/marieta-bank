const { select, input } = require('@inquirer/prompts');
const chalk = require('chalk');
const fs = require('fs');

console.log('Iniciamos o Marieta Bank!');

// Exibe o menu principal e direciona o usuário para a operação escolhida.
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

// Exibe as opções iniciais para criação de uma nova conta.
function createAccount() {
  console.log(chalk.bgGreen.black('Parabéns por escolher o Marieta Bank!'));
  console.log(chalk.green('Defina as opções da sua conta a seguir:'));

  buildAccount();
}

// Solicita o nome da conta e cria o arquivo JSON para armazenar o saldo.
async function buildAccount() {
  const accountName = await input({
    message: 'Digite um nome para criar a sua conta:',
  });

  // Verifica se o nome informado não está vazio.
  if (!accountName.trim()) {
    console.log(chalk.bgRed.black('O nome da conta não pode ficar vazio.'));
    return buildAccount();
  }

  // Cria a pasta de contas caso ela ainda não exista.
  if (!fs.existsSync('accounts')) {
    fs.mkdirSync('accounts');
  }

  // Verifica se já existe uma conta com o nome informado.
  if (fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black('Esta conta já existe, escolha outro nome.')
    );
    return buildAccount();
  }

  // Cria o arquivo da conta com saldo inicial de R$ 0,00.
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify({ balance: 0 }, null, 2)
  );

  console.log(chalk.green('Parabéns, a sua conta foi criada!'));

  // Retorna ao menu principal.
  operation();
}

// Realiza um depósito na conta informada pelo usuário.
async function deposit() {
  const accountName = await input({
    message: 'Qual o nome da sua conta?',
  });

  // Verifica se a conta informada existe.
  if (!checkAccount(accountName)) {
    return deposit();
  }

  const amountText = await input({
    message: 'Qual valor você deseja depositar?',
  });

  const amount = Number(amountText.replace(',', '.'));

  // Verifica se o valor informado é um número válido e maior que zero.
  if (!Number.isFinite(amount) || amount <= 0) {
    console.log(
      chalk.bgRed.black('Digite um valor válido maior que zero.')
    );
    return deposit();
  }

  // Adiciona o valor informado ao saldo da conta.
  addAmount(accountName, amount);

  // Retorna ao menu principal após realizar o depósito.
  operation();
}

// Verifica se a conta informada pelo usuário existe.
function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black('Esta conta não existe, escolha outro nome!')
    );
    return false;
  }

  return true;
}

// Adiciona o valor do depósito ao saldo atual da conta.
function addAmount(accountName, amount) {
  const accountPath = `accounts/${accountName}.json`;

  // Lê os dados atuais da conta.
  const accountData = JSON.parse(
    fs.readFileSync(accountPath, 'utf8')
  );

  // Atualiza o saldo adicionando o valor do depósito.
  accountData.balance += amount;

  // Salva o novo saldo no arquivo JSON.
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

// Consulta e exibe o saldo atual da conta.
async function getAccountBalance() {
  const accountName = await input({
    message: 'Qual o nome da conta?',
  });

  // Verifica se a conta informada existe.
  if (!checkAccount(accountName)) {
    return getAccountBalance();
  }

  // Lê os dados da conta.
  const accountData = JSON.parse(
    fs.readFileSync(`accounts/${accountName}.json`, 'utf8')
  );

  console.log(
    chalk.bgGreen.black(
      `O saldo da sua conta é R$ ${accountData.balance.toFixed(2)}`
    )
  );

  // Retorna ao menu principal.
  operation();
}

// Realiza o saque de um valor da conta.
async function withdraw() {
  const accountName = await input({
    message: 'Qual o titular da conta?',
  });

  // Verifica se a conta informada existe.
  if (!checkAccount(accountName)) {
    return withdraw();
  }

  const amountText = await input({
    message: 'Qual valor você deseja sacar?',
  });

  const amount = Number(amountText.replace(',', '.'));

  // Verifica se o valor informado é válido e maior que zero.
  if (!Number.isFinite(amount) || amount <= 0) {
    console.log(
      chalk.bgRed.black('Digite um valor válido maior que zero.')
    );
    return withdraw();
  }

  const accountPath = `accounts/${accountName}.json`;

  // Lê os dados atuais da conta.
  const accountData = JSON.parse(
    fs.readFileSync(accountPath, 'utf8')
  );

  // Verifica se existe saldo suficiente para realizar o saque.
  if (amount > accountData.balance) {
    console.log(
      chalk.bgRed.black('Saldo insuficiente para realizar o saque.')
    );
    return withdraw();
  }

  // Subtrai o valor do saque do saldo da conta.
  accountData.balance -= amount;

  // Salva o novo saldo no arquivo JSON.
  fs.writeFileSync(
    accountPath,
    JSON.stringify(accountData, null, 2)
  );

  console.log(
    chalk.bgGreen.black(
      `Saque de R$ ${amount.toFixed(2)} realizado com sucesso!`
    )
  );

  // Retorna ao menu principal.
  operation();
}