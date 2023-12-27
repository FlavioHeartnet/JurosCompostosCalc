// calculoJuros.ts
function formatarNumero(numero) {
    return numero.toFixed(2).replace(/\./g, ',').replace(/\d(?=(\d{3})+,)/g, '$&.');
}
function calcularJurosCompostos(valorInicial, aporteMensal, taxaJurosMensal, periodoAnos) {
    var taxaJurosDecimal = taxaJurosMensal / 100;
    var numeroPeriodos = periodoAnos * 12;
    var montante = valorInicial;
    var montantes = [];
    var totais = [];
    for (var i = 1; i <= numeroPeriodos; i++) {
        montante = montante * (1 + taxaJurosDecimal) + aporteMensal;
        montantes.push(formatarNumero(montante));
        totais.push(formatarNumero(montante - valorInicial - aporteMensal * (i - 1)));
    }
    return { montantes: montantes, totais: totais };
}
function imprimirTabela(meses, montantes, totais) {
    console.log('Mês\tMontante\tRendimento Mensal');
    for (var i = 0; i < meses.length; i++) {
        console.log("".concat(meses[i], "\tR$").concat(montantes[i], "\tR$").concat(totais[i]));
    }
}
var valorInicial = 1000;
var aporteMensal = 100;
var taxaJurosMensal = 0.5;
var periodoAnos = 5;
var resultado = calcularJurosCompostos(valorInicial, aporteMensal, taxaJurosMensal, periodoAnos);
// Gere meses para exibição na tabela
var meses = [];
for (var i = 1; i <= periodoAnos * 12; i++) {
    meses.push("".concat(i));
}
// Imprima a tabela
imprimirTabela(meses, resultado.montantes, resultado.totais);
