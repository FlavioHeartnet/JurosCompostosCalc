"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asciichart_1 = require("asciichart");
// Função para calcular juros compostos
function calcularJurosCompostos(valorInicial, aporteMensal, taxaJurosMensal, periodoAnos) {
    var taxaJurosDecimal = taxaJurosMensal / 100;
    var numeroPeriodos = periodoAnos * 12;
    var montante = valorInicial;
    var montantes = [];
    var totais = [];
    var valorInvestido = [];
    for (var i = 1; i <= numeroPeriodos; i++) {
        montante = montante * (1 + taxaJurosDecimal) + aporteMensal;
        montantes.push(montante);
        var totalRendimento = montante - valorInicial - aporteMensal * (i - 1);
        totais.push(totalRendimento);
        valorInvestido.push(montante - totalRendimento);
    }
    return { montantes: montantes, totais: totais, valorInvestido: valorInvestido };
}
// Função para gerar um gráfico de linha
function gerarGrafico(meses) {
    var datasets = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        datasets[_i - 1] = arguments[_i];
    }
    var config = {
        height: 20,
        padding: '   ',
        colors: datasets.map(function (d) { return d.color; }),
        format: function (x) { return x.toFixed(2); },
    };
    var chart = (0, asciichart_1.plot)(datasets.map(function (d) { return d.values; }), config);
    var legend = datasets.map(function (d) { return "".concat(d.color, " ").concat(d.name); }).join('   ');
    console.log("".concat(chart, "\n").concat(legend));
}
// Parâmetros do investimento
var valorInicial = 1000;
var aporteMensal = 100;
var taxaJurosMensal = 0.5;
var periodoAnos = 5;
// Resultados do investimento
var resultado = calcularJurosCompostos(valorInicial, aporteMensal, taxaJurosMensal, periodoAnos);
// Gere meses para exibição no gráfico
var meses = [];
for (var i = 1; i <= periodoAnos * 12; i++) {
    meses.push("".concat(i));
}
// Gere o gráfico
gerarGrafico(meses, { name: 'Valor Investido', values: resultado.valorInvestido, color: asciichart_1.yellow }, { name: 'Rendimento', values: resultado.totais, color: asciichart_1.magenta }, { name: 'Montante Total', values: resultado.montantes, color: asciichart_1.green });
