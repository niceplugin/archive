const arr62 = [...'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'];

function digits(num, i=62) {
  const arr = [];

  while (num) {
    let k = num % i;
    arr.push(arr62[k]);
    num -= k;
    num /= i;
  }

  return arr.reverse().join('');
}

export default digits;