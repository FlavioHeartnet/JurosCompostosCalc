import * as readlineSync from 'readline-sync';
import { calcularJurosCompostosDetalhado, imprimirTabela } from './tabelaRendimentos';
import { formatarNumero } from './helper';

function calcularJurosCompostos(
  valorInicial: number,
  aporteMensal: number,
  taxaJurosMensal: number,
  periodoAnos: number
): string[] {
  const taxaJurosDecimal = taxaJurosMensal / 100;
  const numeroPeriodos = periodoAnos * 12;
  let montante = valorInicial;
  let rendimento = 0;
  for (let i = 1; i <= numeroPeriodos; i++) {
    montante = montante * (1 + taxaJurosDecimal) + aporteMensal;
    rendimento = montante - valorInicial - aporteMensal * (i - 1);
  }

  const investimentoDeduzidoImposto = calcImpostoSobrerendimento(rendimento, periodoAnos);

  return [ 
    formatarNumero(montante), 
    formatarNumero(rendimento - aporteMensal), 
    formatarNumero((montante - rendimento) + aporteMensal), 
    formatarNumero((montante - rendimento) + investimentoDeduzidoImposto.rendimento), 
    investimentoDeduzidoImposto.aliquota.toFixed(1),
    formatarNumero(rendimento - investimentoDeduzidoImposto.rendimento) 
  ];
}

// Solicitar valores ao usuário
const valorInicial = parseFloat(readlineSync.question('Digite o valor inicial: '));
const aporteMensal = parseFloat(readlineSync.question('Digite o aporte mensal: '));
const taxaJurosAnual = parseFloat(readlineSync.question('Digite a taxa de juros anual (decimal usando "." Ex: 5.94): '));
const periodoAnos = parseFloat(readlineSync.question('Período de investimento em anos (para meses Ex: 0.6 = 6 meses): '));
//Converter para Juros mensais
const taxaJurosMensal = taxaJurosAnual / 12;
const resultado = calcularJurosCompostos(
  valorInicial,
  aporteMensal,
  taxaJurosMensal,
  periodoAnos
);

const tabelaRendimentos = calcularJurosCompostosDetalhado(
  valorInicial,
  aporteMensal,
  taxaJurosMensal,
  periodoAnos
);

type RendimentoAliquota = {
  rendimento: number;
  aliquota: number
}

function calcImpostoSobrerendimento(rendimento: number, periodoAnos: number):RendimentoAliquota  {
  let aliquota = 0;
  if(periodoAnos <= 0.6){
    aliquota = 22.5;
  }
  if(periodoAnos > 0.6 && periodoAnos < 1) {
    aliquota = 20;
  }
  if(periodoAnos > 1 && periodoAnos < 2) {
    aliquota = 17.5;
  }
  if(periodoAnos > 2) {
    aliquota = 15;
  }
  const rendimentoDeduzidoImposto = rendimento - ((aliquota / 100) * rendimento);
  return {
    aliquota: aliquota,
    rendimento: rendimentoDeduzidoImposto
  }
}



console.log(`\nO montante acumulado ao final de ${periodoAnos} anos é \x1b[38;2;102;204;0mR$${resultado[0]}\x1b[0m
  \nValor Investido: \x1b[38;2;255;255;0mR$${resultado[2]}\x1b[0m
  \nRendimento: \x1b[38;2;0;128;255mR$${resultado[1]}\x1b[0m
  \nCaso este investimento não seja isento de IR, segue calculo de dedução:  
  \nValor total deduzindo imposto de renda: \x1b[38;2;128;225;0mR$${resultado[3]}\x1b[0m  
  \nValor retido na fonte: \x1b[38;2;255;51;51mR$${resultado[5]}\x1b[0m  Aliquota: \x1b[38;2;255;51;51m${resultado[4]}%\x1b[0m 
`);
const meses: string[] = [];
for (let i = 1; i <= periodoAnos * 12; i++) {
  meses.push(`${i}`);
}
imprimirTabela(meses, tabelaRendimentos.montantes, tabelaRendimentos.totais, tabelaRendimentos.valoresInvestidos);
