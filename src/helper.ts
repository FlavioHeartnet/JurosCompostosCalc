export function formatarNumero(numero: number): string {
    return numero.toFixed(2).replace(/\./g, ',').replace(/\d(?=(\d{3})+,)/g, '$&.');
  }

  export function obterAliquotaComeCotas(diasInvestidos: number): number {
    if (diasInvestidos <= 180) {
      return 0.225; // 22,5%
    } else if (diasInvestidos <= 360) {
      return 0.20; // 20%
    } else if (diasInvestidos <= 720) {
      return 0.175; // 17,5%
    } else {
      return 0.15; // 15%
    }
  }
export type RendimentoAliquota = {
  rendimento: number;
  aliquota: number
}
export function calcImpostoSobrerendimento(rendimento: number, periodoAnos: number): RendimentoAliquota  {
    let aliquota = 0;
    if(periodoAnos <= 0.6){
      aliquota = 0.225; // 22,5%
    }
    if(periodoAnos > 0.6 && periodoAnos < 1) {
      aliquota = 0.20; // 20%
    }
    if(periodoAnos > 1 && periodoAnos < 2) {
      aliquota = 0.175; // 17,5%
    }
    if(periodoAnos > 2) {
      aliquota = 0.15; // 15%
    }
    const rendimentoDeduzidoImposto = rendimento - (aliquota * rendimento);
    return {
      aliquota: aliquota * 100,
      rendimento: rendimentoDeduzidoImposto
    }
  }