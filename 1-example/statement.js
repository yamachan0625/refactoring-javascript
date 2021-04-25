import createStatementData from './createStatementData';

const plays = {
  hamlet: { name: 'hamlet', type: 'tragedy' },
  aslike: { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' },
};

const invoice = {
  customer: 'BigCo',
  performances: [
    { playID: 'hamlet', audience: 55 },
    { playID: 'aslike', audience: 35 },
    { playID: 'othello', audience: 40 },
  ],
};

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}

// renderHtmlからも使用できるようにトップレベルに移動
function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100); // フォーマット用の関数側に移動
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    //注文の内訳を表示
    result += ` ${perf.play.name}:${usd(perf.amount)} (${
      perf.audience
    } seats) \n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += `<table>\n`;
  result += '<tr><th>play</th><th>seats</th><th>const</th></tr>';
  for (let perf of data.performances) {
  }
  // ......
  // ......
  // ......
  return result;
}

// console.log(statement(invoice, plays));
console.log(htmlStatement(invoice, plays));
