export default function getPrices(item) {
  let arr = item.map((i) => i.price);
  let sum = arr.reduce((a, b) => a + b, 0);
  return sum;
}
