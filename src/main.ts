import * as readlineSync from 'readline-sync';
import { calcularJurosCompostos, SimulacaoOutPut, imprimirTabela } from './helper';


export class SimuladorInvestimentos {
  valorInicial: number = 0;
  aporteMensal: number = 0;
  taxaJurosMensal: number = 0;
  periodoAnos: number = 0;
  taxacorretagemAnual: number = 0;
  temComeCotas: number = 0;

  solicitarValores(){
    // Solicitar valores ao usuário
    this.valorInicial = parseFloat(readlineSync.question('Digite o valor inicial: '));
    this.aporteMensal = parseFloat(readlineSync.question('Digite o aporte mensal: '));
    const taxaJurosAnual = parseFloat(readlineSync.question('Digite a taxa de juros anual (decimal usando "." Ex: 5.94): '));
    this.taxacorretagemAnual = parseFloat(readlineSync.question('Se existir taxa de corretagem digite aqui: (Ex: 0.7 ao ano): '));
    this.temComeCotas = parseFloat(readlineSync.question('Seu investimento esta sujeito ao come cotas(renda fixa, cambiais ou multimercados)?: (1) Sim, (2) não:  '));
    if(this.temComeCotas <= 0 || this.temComeCotas > 2){
      console.log('Opção invalida!!');
      process.exit(1);
    }
    this.periodoAnos = parseFloat(readlineSync.question('Período de investimento em anos (para meses Ex: 0.6 = 6 meses): '));
    //Converter para Juros mensais
    this.taxaJurosMensal = taxaJurosAnual / 12;
  }

  calcularJurosCompostos(): SimulacaoOutPut {
    return calcularJurosCompostos(this.valorInicial, this.aporteMensal, this.taxaJurosMensal, this.periodoAnos, this.taxacorretagemAnual, this.temComeCotas); 
  }
}

const simulador = new SimuladorInvestimentos();
simulador.solicitarValores();
const resultado = simulador.calcularJurosCompostos();

console.log(`\nO montante acumulado ao final de ${simulador.periodoAnos} anos é \x1b[38;2;102;204;0mR$${resultado.montante}\x1b[0m
  \nValor Investido: \x1b[38;2;255;255;0mR$${resultado.valorInvestido}\x1b[0m
  \nRendimento: \x1b[38;2;0;128;255mR$${resultado.rendimento}\x1b[0m
  \nCaso este investimento não seja isento de IR, segue calculo de dedução:  
  \nValor total deduzindo imposto de renda: \x1b[38;2;128;225;0mR$${resultado.montanteDepoisIR}\x1b[0m  
  \nValor retido na fonte: \x1b[38;2;255;51;51mR$${resultado.valorRetidoIR}\x1b[0m  Aliquota: \x1b[38;2;255;51;51m${resultado.aliquota}%\x1b[0m 
`);
if(parseFloat(resultado.valorRetidoComeCotas) > 0){
  console.log(`Valor retido no come cotas: \x1b[38;2;255;51;51mR$${resultado.valorRetidoComeCotas}\x1b[0m`);
}

imprimirTabela(resultado.tabelaDetalhada.meses, resultado.tabelaDetalhada.montantes, resultado.tabelaDetalhada.rendimentosMensais, resultado.tabelaDetalhada.valoresInvestidos);
