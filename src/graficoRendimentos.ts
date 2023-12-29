// ! DEPRECATED: Não será mais usada
import { plot, yellow, magenta, green } from 'asciichart';
import * as readlineSync from 'readline-sync';
// Função para calcular juros compostos
function calcularJurosCompostos(
  valorInicial: number,
  aporteMensal: number,
  taxaJurosMensal: number,
  periodoAnos: number
): { montantes: number[], totais: number[], valoresInvestidos: number[] } {
  const taxaJurosDecimal = taxaJurosMensal / 100;
  const numeroPeriodos = periodoAnos * 12;
  let montante = valorInicial;
  const montantes: number[] = [];
  const totais: number[] = [];
  const valoresInvestidos: number[] = [];

  for (let i = 1; i <= numeroPeriodos; i++) {
    montante = montante * (1 + taxaJurosDecimal) + aporteMensal;
    montantes.push(montante);
    const totalRendimento = montante - valorInicial - aporteMensal * (i - 1)
    totais.push(totalRendimento);
    valoresInvestidos.push(montante - totalRendimento);
    
  }

  return { montantes, totais, valoresInvestidos };
}

// Função para gerar um gráfico de linha
function gerarGrafico(
  meses: string[],
  ...datasets: { name: string; values: number[]; color: string }[]
): void {
  const config = {
    height: 20,
    padding: ' ', // Padding para rótulos à esquerda
    colors: datasets.map((d) => d.color),
    format: (x: number ) => x.toFixed(2),
    max: 5
  };

  const chart = plot(datasets.map((d) => d.values), config);
  const legend = datasets.map((d) => `${d.color} ${d.name}`).join('   ');

  console.log(`${chart}\n${legend}`);
}
// Parâmetros do investimento
const valorInicial = parseFloat(readlineSync.question('Digite o valor inicial: '));
const aporteMensal = parseFloat(readlineSync.question('Digite o aporte mensal: '));
const taxaJurosAnual = parseFloat(readlineSync.question('Digite a taxa de juros anual (decimal usando "." Ex: 5.94): '));
const periodoAnos = parseFloat(readlineSync.question('Digite o período de investimento em anos: '));
//Converter para Juros mensais
const taxaJurosMensal = taxaJurosAnual / 12;

// Resultados do investimento
const resultado = calcularJurosCompostos(
  valorInicial,
  aporteMensal,
  taxaJurosMensal,
  periodoAnos
);

// Gere meses para exibição no gráfico
const meses: string[] = [];
for (let i = 1; i <= periodoAnos * 12; i++) {
  meses.push(`${i}`);
}

// Gere o gráfico
gerarGrafico(
  meses,
  { name: 'Valor Investido', values: resultado.valoresInvestidos, color: yellow },
  { name: 'Rendimento', values: resultado.totais, color: magenta },
  { name: 'Montante Total', values: resultado.montantes, color: green }
);