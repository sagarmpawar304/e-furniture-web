export const thousand_separator = (num) => {
  if (num !== undefined) {
    let price = num.toString()
    price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return price
  }
}
