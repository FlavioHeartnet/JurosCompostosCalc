export class JurosCompostos {
    calcularJurosComAporteMensal(aporteMensal: number, taxaJurosMensal: number, tempoMeses: number): number {
      const montanteFinal = aporteMensal * ((Math.pow(1 + taxaJurosMensal, tempoMeses) - 1) / taxaJurosMensal);
      return montanteFinal;
    }
  }
  