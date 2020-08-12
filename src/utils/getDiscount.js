export default function getDiscount(item) {
  let arr = item.map((i) => i.discount);
  let discount = arr.reduce((a, b) => a + b, 0);
  return discount;
}
