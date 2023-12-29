import { calcularJurosCompostos, type SimulacaoOutPut } from './helper';


export class SimuladorInvestimentos {
  valorInicial: number = 0;
  aporteMensal: number = 0;
  taxaJurosAnual: number = 0;
  periodoAnos: number = 0;
  taxacorretagemAnual: number = 0;
  temComeCotas: boolean = false;

  constructor(valorInicial: number, aporteMensal: number, taxaJurosMensal: number, periodoAnos:number, taxacorretagemAnual: number, temComeCotas: boolean  ){
    this.valorInicial = valorInicial;
    this.aporteMensal = aporteMensal;
    this.taxaJurosAnual = taxaJurosMensal;
    this.periodoAnos = periodoAnos;
    this.taxacorretagemAnual = taxacorretagemAnual;
    this.temComeCotas = temComeCotas;
  }

  calcularJurosCompostos(): SimulacaoOutPut {
    return calcularJurosCompostos(this.valorInicial, this.aporteMensal, this.taxaJurosAnual, this.periodoAnos, this.taxacorretagemAnual, this.temComeCotas); 
  }
}
