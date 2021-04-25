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
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  //言語に依存した数値書式を可能にするオブジェクトのコンストラクター
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance /** 名前から型がわかるようにする */, play) {
    let result = 0; // 関数の戻り値を示す面数名は常にresultにすると役割が明確になる
    switch (playFor(aPerformance)) {
      case 'tragedy': {
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      }
      case 'comedy': {
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      }
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
  }

  for (let perf of invoice.performances) {
    let thisAmount = amountFor(perf, playFor(perf));

    // ボリュームの得点のポイントを加算
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 喜劇の時は10人につきさらにポイントを加算
    if ('comedy' === playFor(perf).type)
      volumeCredits += Math.floor(perf.audience / 5);
    //注文の内訳を表示
    result += ` ${playFor(perf).name}:${format(thisAmount / 100)} (${
      perf.audience
    } seats) \n`;
    totalAmount += thisAmount;
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

statement(invoice, plays);
