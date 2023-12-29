import * as readlineSync from 'readline-sync';
import { calcularJurosCompostosDetalhado, imprimirTabela } from './tabelaRendimentos';
import { calcImpostoSobrerendimento, formatarNumero, obterAliquotaComeCotas, RendimentoAliquota } from './helper';

function calcularJurosCompostos(
  valorInicial: number,
  aporteMensal: number,
  taxaJurosMensal: number,
  periodoAnos: number,
  taxacorretagemAnual: number,
  temComeCotas: number
): string[] {
  const taxaJurosDecimal = taxaJurosMensal / 100;
  const numeroPeriodos = periodoAnos * 12;
  let montante = valorInicial;
  let rendimento = 0;
  const taxaCorretagemMensal = taxacorretagemAnual / 12 / 100; // Taxa de corretagem mensal
  let  impostoPagoComeCotas = 0; // Valor total de impostos pagos no come cotas

 
  for (let i = 1; i <= numeroPeriodos; i++) {
    montante = montante * (1 + taxaJurosDecimal); // juros do mês anterior
    montante = montante * (1 - taxaCorretagemMensal); // Deduz a taxa de corretagem
    montante += aporteMensal; // Adiciona o aporte mensal ao mês atual.
    rendimento = montante - valorInicial - aporteMensal * (i - 1);
    
    if(temComeCotas == 1){
      if ((i + 1) % 6 === 0) {
        // Aplica o come-cotas a cada 6 meses
        const diasInvestidos = (i + 1) * 30; // Aproximadamente assumindo 30 dias por mês
        const aliquotaComeCotas = obterAliquotaComeCotas(diasInvestidos);
        const rendimentoSemImposto = montante - valorInicial - (aporteMensal * i);
        const impostoComeCotas = rendimentoSemImposto * aliquotaComeCotas;
        montante -= impostoComeCotas;
        impostoPagoComeCotas += impostoComeCotas;
      }
    }
  }

  const investimentoDeduzidoImposto = calcImpostoSobrerendimento(rendimento, periodoAnos);

  return [ 
    formatarNumero(montante), 
    formatarNumero(rendimento - aporteMensal), 
    formatarNumero((montante - rendimento) + aporteMensal), 
    formatarNumero((montante - rendimento) + investimentoDeduzidoImposto.rendimento), 
    investimentoDeduzidoImposto.aliquota.toFixed(1),
    formatarNumero(rendimento - investimentoDeduzidoImposto.rendimento),
    formatarNumero(impostoPagoComeCotas) 
  ];
}

// Solicitar valores ao usuário
const valorInicial = parseFloat(readlineSync.question('Digite o valor inicial: '));
const aporteMensal = parseFloat(readlineSync.question('Digite o aporte mensal: '));
const taxaJurosAnual = parseFloat(readlineSync.question('Digite a taxa de juros anual (decimal usando "." Ex: 5.94): '));
const taxacorretagemAnual = parseFloat(readlineSync.question('Se existir taxa de corretagem digite aqui: (Ex: 0.7 ao ano): '));
const temComeCotas = parseFloat(readlineSync.question('Seu investimento esta sujeito ao come cotas(renda fixa, cambiais ou multimercados)?: (1) Sim, (2) não:  '));
if(temComeCotas <= 0 || temComeCotas > 2){
  console.log('Opção invalida!!');
  process.exit(1);
}
const periodoAnos = parseFloat(readlineSync.question('Período de investimento em anos (para meses Ex: 0.6 = 6 meses): '));
//Converter para Juros mensais
const taxaJurosMensal = taxaJurosAnual / 12;
const resultado = calcularJurosCompostos(
  valorInicial,
  aporteMensal,
  taxaJurosMensal,
  periodoAnos,
  taxacorretagemAnual,
  temComeCotas
);

const tabelaRendimentos = calcularJurosCompostosDetalhado(
  valorInicial,
  aporteMensal,
  taxaJurosMensal,
  periodoAnos,
  temComeCotas
);


console.log(`\nO montante acumulado ao final de ${periodoAnos} anos é \x1b[38;2;102;204;0mR$${resultado[0]}\x1b[0m
  \nValor Investido: \x1b[38;2;255;255;0mR$${resultado[2]}\x1b[0m
  \nRendimento: \x1b[38;2;0;128;255mR$${resultado[1]}\x1b[0m
  \nCaso este investimento não seja isento de IR, segue calculo de dedução:  
  \nValor total deduzindo imposto de renda: \x1b[38;2;128;225;0mR$${resultado[3]}\x1b[0m  
  \nValor retido na fonte: \x1b[38;2;255;51;51mR$${resultado[5]}\x1b[0m  Aliquota: \x1b[38;2;255;51;51m${resultado[4]}%\x1b[0m 
`);
if(parseFloat(resultado[6]) > 0){
  console.log(`Valor retido no come cotas: \x1b[38;2;255;51;51mR$${resultado[6]}\x1b[0m`);
}
const meses: string[] = [];
for (let i = 1; i <= periodoAnos * 12; i++) {
  meses.push(`${i}`);
}

//imprimirTabela(meses, tabelaRendimentos.montantes, tabelaRendimentos.rendimentosMensais, tabelaRendimentos.valoresInvestidos);
