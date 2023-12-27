function calcularJurosCompostos(valorInicial, aporteMensal, taxaJurosMensal, periodoAnos) {
    var taxaJurosDecimal = taxaJurosMensal / 100;
    var numeroPeriodos = periodoAnos * 12;
    var montante = valorInicial;
    for (var i = 1; i <= numeroPeriodos; i++) {
        montante = montante * (1 + taxaJurosDecimal) + aporteMensal;
    }
    return formatarNumero(montante);
}
var valorInicial = 2000;
var aporteMensal = 500;
var taxaJurosMensal = 0.946;
var periodoAnos = 20;
var resultado = calcularJurosCompostos(valorInicial, aporteMensal, taxaJurosMensal, periodoAnos);
function formatarNumero(numero) {
    return numero.toFixed(2).replace(/\./g, ',').replace(/\d(?=(\d{3})+,)/g, '$&.');
}
console.log("O montante acumulado ao final de ".concat(periodoAnos, " anos \u00E9 R$").concat(resultado));
