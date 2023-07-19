export function convertToNumber(string) {
  const filteredString = string.replace(/[.,đ]/g, "");
  return parseInt(filteredString);
}
export function convertToCurrencyFormat(number) {
  const numberString = number ? number.toString() : 0;
  let formattedString = "";

  for (let i = numberString.length - 1, count = 0; i >= 0; i--, count++) {
    if (count !== 0 && count % 3 === 0) {
      formattedString = "." + formattedString;
    }
    formattedString = numberString[i] + formattedString;
  }

  return formattedString + ' đ';
}
