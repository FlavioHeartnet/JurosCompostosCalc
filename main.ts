function calcularJurosCompostos(
  valorInicial: number,
  aporteMensal: number,
  taxaJurosMensal: number,
  periodoAnos: number
): string {
  const taxaJurosDecimal = taxaJurosMensal / 100;
  const numeroPeriodos = periodoAnos * 12;
  let montante = valorInicial;

  for (let i = 1; i <= numeroPeriodos; i++) {
    montante = montante * (1 + taxaJurosDecimal) + aporteMensal;
  }

  return formatarNumero(montante);
}

const valorInicial = 2000;
const aporteMensal = 500;
const taxaJurosMensal = 0.946;
const periodoAnos = 20;

const resultado = calcularJurosCompostos(
  valorInicial,
  aporteMensal,
  taxaJurosMensal,
  periodoAnos
);
function formatarNumero(numero: number): string {
  return numero.toFixed(2).replace(/\./g, ',').replace(/\d(?=(\d{3})+,)/g, '$&.');
}
console.log(`O montante acumulado ao final de ${periodoAnos} anos é R$${resultado}`);
