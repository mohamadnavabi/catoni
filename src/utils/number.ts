const currencyFormat = (currency: string | number) =>
  String(currency)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export { currencyFormat };
