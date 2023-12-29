import { formatarNumero } from "./helper";



export function calcularJurosCompostosDetalhado(
  valorInicial: number,
  aporteMensal: number,
  taxaJurosMensal: number,
  periodoAnos: number,
  temComecotas: number
): { montantes: string[], rendimentosMensais: string[], valoresInvestidos: string[] } {
  const taxaJurosDecimal = taxaJurosMensal / 100;
  const numeroPeriodos = periodoAnos * 12;
  let montante = valorInicial;
  const montantes: string[] = [];
  const rendimentosMensais: string[] = [];
  const valoresInvestidos: string[] = [];

  for (let i = 1; i <= numeroPeriodos; i++) {
    montante = montante * (1 + taxaJurosDecimal) + aporteMensal;
    montantes.push(formatarNumero(montante));
    const rendimento = montante - valorInicial - aporteMensal * (i - 1);
    rendimentosMensais.push(formatarNumero(rendimento - aporteMensal));
    valoresInvestidos.push(formatarNumero(montante - rendimento));
  }

  return { montantes, rendimentosMensais, valoresInvestidos };
}

export function imprimirTabela(meses: string[], montantes: string[], totais: string[], valoresInvestidos: string[]): void {
  console.log('Mês\tMontante\tRendimento Mensal\tValor Mensal Investido');
  for (let i = 0; i < meses.length; i++) {
    console.log(`${meses[i]}\tR$${montantes[i]}\tR$${totais[i]}\t\tR$${valoresInvestidos[i]}`);
  } 
}


