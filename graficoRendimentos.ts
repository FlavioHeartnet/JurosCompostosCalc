
import { plot, yellow, magenta, green } from 'asciichart';

// Função para calcular juros compostos
function calcularJurosCompostos(
  valorInicial: number,
  aporteMensal: number,
  taxaJurosMensal: number,
  periodoAnos: number
): { montantes: number[], totais: number[], juros: number[] } {
  const taxaJurosDecimal = taxaJurosMensal / 100;
  const numeroPeriodos = periodoAnos * 12;
  let montante = valorInicial;
  const montantes: number[] = [];
  const totais: number[] = [];
  const juros: number[] = [];

  for (let i = 1; i <= numeroPeriodos; i++) {
    montante = montante * (1 + taxaJurosDecimal) + aporteMensal;
    montantes.push(montante);
    totais.push(montante - valorInicial - aporteMensal * (i - 1));
    juros.push(totais[i - 1] - aporteMensal * (i - 1));
  }

  return { montantes, totais, juros };
}

// Função para gerar um gráfico de linha
function gerarGrafico(
  meses: string[],
  ...datasets: { name: string; values: number[]; color: string }[]
): void {
  const config = {
    height: 20,
    padding: '   ', // Padding para rótulos à esquerda
    colors: datasets.map((d) => d.color),
  };

  const chart = plot(datasets.map((d) => d.values), config);
  const legend = datasets.map((d) => `${d.color} ${d.name}`).join('   ');

  console.log(chart);
  console.log(`${chart}\n${legend}`);
}
// Parâmetros do investimento
const valorInicial = 1000;
const aporteMensal = 100;
const taxaJurosMensal = 0.5;
const periodoAnos = 5;

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
  { name: 'Valor Investido', values: resultado.totais, color: yellow },
  { name: 'Total em Juros', values: resultado.juros, color: magenta },
  { name: 'Montante Total', values: resultado.montantes, color: green }
);