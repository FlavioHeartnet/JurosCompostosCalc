export function formatarNumero(numero: number): string {
    return numero.toFixed(2).replace(/\./g, ',').replace(/\d(?=(\d{3})+,)/g, '$&.');
  }