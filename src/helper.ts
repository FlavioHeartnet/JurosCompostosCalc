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

  export function calculaComeCotas(){
    return 0;
  }
  export type SimulacaoOutPut = {
    montante: string;
    rendimento: string;
    valorInvestido: string;
    montanteDepoisIR: string;
    valorRetidoIR: string;
    aliquota: string;
    valorRetidoComeCotas: string;
    tabelaDetalhada: {
      meses: string[];
      montantes: string[];
      rendimentosMensais: string[];
      valoresInvestidos: string[];
    };
  }

 export function calcularJurosCompostos(
    valorInicial: number,
    aporteMensal: number,
    taxaJurosMensal: number,
    periodoAnos: number,
    taxacorretagemAnual: number,
    temComeCotas: number
  ): SimulacaoOutPut {
    const taxaJurosDecimal = taxaJurosMensal / 100;
    const numeroPeriodos = periodoAnos * 12;
    let montante = valorInicial;
    let rendimento = 0;
    const taxaCorretagemMensal = taxacorretagemAnual / 12 / 100; // Taxa de corretagem mensal
    let  impostoPagoComeCotas = 0; // Valor total de impostos pagos no come cotas
  
    //guardar valores mensais
    const montantes: string[] = [];
    const rendimentosMensais: string[] = [];
    const valoresInvestidos: string[] = [];
   
    for (let i = 1; i <= numeroPeriodos; i++) {
      montante = montante * (1 + taxaJurosDecimal); // juros do mês anterior
      montante = montante * (1 - taxaCorretagemMensal); // Deduz a taxa de corretagem
      montante += aporteMensal; // Adiciona o aporte mensal ao mês atual.
      montantes.push(formatarNumero(montante));
      rendimento = montante - valorInicial - aporteMensal * (i - 1);
      rendimentosMensais.push(formatarNumero(rendimento - aporteMensal));
      valoresInvestidos.push(formatarNumero(montante - rendimento));
      
      if(temComeCotas == 1){
        if ((i + 1) % 6 === 0) {
          // Aplica o come-cotas a cada 6 meses
          const diasInvestidos = (i + 1) * 30; // Aproximadamente assumindo 30 dias por mês
          const aliquotaComeCotas = obterAliquotaComeCotas(diasInvestidos);
          const rendimentoSemImposto = montante - valorInicial - (aporteMensal * i);
          const impostoComeCotas = rendimentoSemImposto * aliquotaComeCotas;
          montante -= impostoComeCotas;
          impostoPagoComeCotas += impostoComeCotas;
        }
      }
    }
  
    const investimentoDeduzidoImposto = calcImpostoSobrerendimento(rendimento, periodoAnos);
    const meses: string[] = [];
    for (let i = 1; i <= periodoAnos * 12; i++) {
      meses.push(`${i}`);
    }
    return {
      montante: formatarNumero(montante), 
      rendimento: formatarNumero(rendimento - aporteMensal), 
      valorInvestido: formatarNumero((montante - rendimento) + aporteMensal), 
      montanteDepoisIR: formatarNumero((montante - rendimento) + investimentoDeduzidoImposto.rendimento), 
      aliquota: investimentoDeduzidoImposto.aliquota.toFixed(1),
      valorRetidoIR: formatarNumero(rendimento - investimentoDeduzidoImposto.rendimento),
      valorRetidoComeCotas: formatarNumero(impostoPagoComeCotas),
      tabelaDetalhada: {
        montantes: montantes,
        meses: meses,
        rendimentosMensais: rendimentosMensais,
        valoresInvestidos: valoresInvestidos,
      }
    }
  }

  export function imprimirTabela(meses: string[], montantes: string[], totais: string[], valoresInvestidos: string[]): void {
    console.log('Mês\tMontante\tRendimento Mensal\tValor Mensal Investido');
    for (let i = 0; i < meses.length; i++) {
      console.log(`${meses[i]}\tR$${montantes[i]}\tR$${totais[i]}\t\tR$${valoresInvestidos[i]}`);
    } 
  }