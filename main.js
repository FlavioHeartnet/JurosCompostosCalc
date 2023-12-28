"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
function calcularJurosCompostos(valorInicial, aporteMensal, taxaJurosMensal, periodoAnos) {
    var taxaJurosDecimal = taxaJurosMensal / 100;
    var numeroPeriodos = periodoAnos * 12;
    var montante = valorInicial;
    var rendimento = 0;
    for (var i = 1; i <= numeroPeriodos; i++) {
        montante = montante * (1 + taxaJurosDecimal) + aporteMensal;
        rendimento = montante - valorInicial - aporteMensal * (i - 1);
    }
    var investimentoDeduzidoImposto = calcImpostoSobrerendimento(rendimento, periodoAnos);
    return [
        formatarNumero(montante),
        formatarNumero(rendimento),
        formatarNumero(montante - rendimento),
        formatarNumero((montante - rendimento) + investimentoDeduzidoImposto.rendimento),
        investimentoDeduzidoImposto.aliquota.toFixed(1),
        formatarNumero(rendimento - investimentoDeduzidoImposto.rendimento)
    ];
}
// Solicitar valores ao usuário
var valorInicial = parseFloat(readlineSync.question('Digite o valor inicial: '));
var aporteMensal = parseFloat(readlineSync.question('Digite o aporte mensal: '));
var taxaJurosAnual = parseFloat(readlineSync.question('Digite a taxa de juros anual (decimal usando "." Ex: 5.94): '));
var periodoAnos = parseFloat(readlineSync.question('Digite o período de investimento em anos: '));
var taxaJurosMensal = taxaJurosAnual / 12;
var resultado = calcularJurosCompostos(valorInicial, aporteMensal, taxaJurosMensal, periodoAnos);
function formatarNumero(numero) {
    return numero.toFixed(2).replace(/\./g, ',').replace(/\d(?=(\d{3})+,)/g, '$&.');
}
function calcImpostoSobrerendimento(rendimento, periodoAnos) {
    var aliquota = 0;
    if (periodoAnos <= 0.6) {
        aliquota = 22.5;
    }
    if (periodoAnos > 0.6 && periodoAnos < 1) {
        aliquota = 20;
    }
    if (periodoAnos > 1 && periodoAnos < 2) {
        aliquota = 17.5;
    }
    if (periodoAnos > 2) {
        aliquota = 15;
    }
    var rendimentoDeduzidoImposto = rendimento - ((aliquota / 100) * rendimento);
    return {
        aliquota: aliquota,
        rendimento: rendimentoDeduzidoImposto
    };
}
console.log("\nO montante acumulado ao final de ".concat(periodoAnos, " anos \u00E9 \u001B[38;2;102;204;0mR$").concat(resultado[0], "\u001B[0m\n  \nValor Investido: \u001B[38;2;255;255;0mR$").concat(resultado[2], "\u001B[0m\n  \nRendimento: \u001B[38;2;0;128;255mR$").concat(resultado[1], "\u001B[0m\n  \nCaso este investimento n\u00E3o seja isento de IR, segue calculo de dedu\u00E7\u00E3o:  \n  \nValor total deduzindo imposto de renda: \u001B[38;2;128;225;0mR$").concat(resultado[3], "\u001B[0m  \n  \nValor retido na fonte: \u001B[38;2;255;51;51mR$").concat(resultado[5], "\u001B[0m  Aliquota: \u001B[38;2;255;51;51m").concat(resultado[4], "%\u001B[0m \n"));
