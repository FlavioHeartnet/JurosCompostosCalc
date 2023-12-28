import * as readlineSync from 'readline-sync';

// calculoJuros.ts
function formatarNumero(numero: number): string {
  return numero.toFixed(2).replace(/\./g, ',').replace(/\d(?=(\d{3})+,)/g, '$&.');
}

function calcularJurosCompostos(
  valorInicial: number,
  aporteMensal: number,
  taxaJurosMensal: number,
  periodoAnos: number
): { montantes: string[], totais: string[], valoresInvestidos: string[] } {
  const taxaJurosDecimal = taxaJurosMensal / 100;
  const numeroPeriodos = periodoAnos * 12;
  let montante = valorInicial;
  const montantes: string[] = [];
  const totais: string[] = [];
  const valoresInvestidos: string[] = [];

  for (let i = 1; i <= numeroPeriodos; i++) {
    montante = montante * (1 + taxaJurosDecimal) + aporteMensal;
    montantes.push(formatarNumero(montante));
    const rendimento = montante - valorInicial - aporteMensal * (i - 1);
    totais.push(formatarNumero(rendimento));
    valoresInvestidos.push(formatarNumero(montante - rendimento));
  }

  return { montantes, totais, valoresInvestidos };
}

function imprimirTabela(meses: string[], montantes: string[], totais: string[], valoresInvestidos: string[]): void {
  console.log('Mês\tMontante\tRendimento Mensal\tValor Mensal Investido');
  for (let i = 0; i < meses.length; i++) {
    console.log(`${meses[i]}\tR$${montantes[i]}\tR$${totais[i]}\t\tR$${valoresInvestidos[i]}`);
  } 
}

const valorInicial = parseFloat(readlineSync.question('Digite o valor inicial: '));
const aporteMensal = parseFloat(readlineSync.question('Digite o aporte mensal: '));
const taxaJurosAnual = parseFloat(readlineSync.question('Digite a taxa de juros anual (decimal usando "." Ex: 5.94): '));
const periodoAnos = parseFloat(readlineSync.question('Digite o período de investimento em anos: '));
//Converter para Juros mensais
const taxaJurosMensal = taxaJurosAnual / 12;
const resultado = calcularJurosCompostos(
  valorInicial,
  aporteMensal,
  taxaJurosMensal,
  periodoAnos
);

// Gere meses para exibição na tabela
const meses: string[] = [];
for (let i = 1; i <= periodoAnos * 12; i++) {
  meses.push(`${i}`);
}
// Imprima a tabela
imprimirTabela(meses, resultado.montantes, resultado.totais, resultado.valoresInvestidos);

