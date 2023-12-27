// calculoJuros.ts
function formatarNumero(numero: number): string {
  return numero.toFixed(2).replace(/\./g, ',').replace(/\d(?=(\d{3})+,)/g, '$&.');
}

function calcularJurosCompostos(
  valorInicial: number,
  aporteMensal: number,
  taxaJurosMensal: number,
  periodoAnos: number
): { montantes: string[], totais: string[] } {
  const taxaJurosDecimal = taxaJurosMensal / 100;
  const numeroPeriodos = periodoAnos * 12;
  let montante = valorInicial;
  const montantes: string[] = [];
  const totais: string[] = [];

  for (let i = 1; i <= numeroPeriodos; i++) {
    montante = montante * (1 + taxaJurosDecimal) + aporteMensal;
    montantes.push(formatarNumero(montante));
    totais.push(formatarNumero(montante - valorInicial - aporteMensal * (i - 1)));
  }

  return { montantes, totais };
}

function imprimirTabela(meses: string[], montantes: string[], totais: string[]): void {
  console.log('Mês\tMontante\tRendimento Mensal');
  for (let i = 0; i < meses.length; i++) {
    console.log(`${meses[i]}\tR$${montantes[i]}\tR$${totais[i]}`);
  } 
}

const valorInicial = 1000;
const aporteMensal = 100;
const taxaJurosMensal = 0.5;
const periodoAnos = 5;

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
imprimirTabela(meses, resultado.montantes, resultado.totais);

