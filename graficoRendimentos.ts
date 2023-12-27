
import { plot, yellow, magenta, green } from 'asciichart';

// Função para calcular juros compostos
function calcularJurosCompostos(
  valorInicial: number,
  aporteMensal: number,
  taxaJurosMensal: number,
  periodoAnos: number
): { montantes: number[], totais: number[], valorInvestido: number[] } {
  const taxaJurosDecimal = taxaJurosMensal / 100;
  const numeroPeriodos = periodoAnos * 12;
  let montante = valorInicial;
  const montantes: number[] = [];
  const totais: number[] = [];
  const valorInvestido: number[] = [];

  for (let i = 1; i <= numeroPeriodos; i++) {
    montante = montante * (1 + taxaJurosDecimal) + aporteMensal;
    montantes.push(montante);
    const totalRendimento = montante - valorInicial - aporteMensal * (i - 1)
    totais.push(totalRendimento);
    valorInvestido.push(montante - totalRendimento);
    
  }

  return { montantes, totais, valorInvestido };
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
    format: (x: number ) => x.toFixed(2),
  };

  const chart = plot(datasets.map((d) => d.values), config);
  const legend = datasets.map((d) => `${d.color} ${d.name}`).join('   ');

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
  { name: 'Valor Investido', values: resultado.valorInvestido, color: yellow },
  { name: 'Rendimento', values: resultado.totais, color: magenta },
  { name: 'Montante Total', values: resultado.montantes, color: green }
);