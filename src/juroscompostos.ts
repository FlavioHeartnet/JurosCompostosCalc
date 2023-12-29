// TODO: Usar esta classe para alguma geração de valores ou visualização, por enquanto não esta sendo usada
export class JurosCompostos {
    calcularJurosComAporteMensal(aporteMensal: number, taxaJurosMensal: number, tempoMeses: number): number {
      const montanteFinal = aporteMensal * ((Math.pow(1 + taxaJurosMensal, tempoMeses) - 1) / taxaJurosMensal);
      return montanteFinal;
    }
  }

    //const montanteInicial = 1000;
   // const montanteFinal = montanteInicial + new JurosCompostos().calcularJurosComAporteMensal(aporteMensal, taxaJurosDecimal, numeroPeriodos );
  // console.log(`O montante final após ${numeroPeriodos} meses é: ${formatarNumero(montanteFinal)} versão teste AB`);
  