export const generateTransactionRef = (length: number) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `rkings_tx_${result}`;
};

export const formatNumberWithCommasAndDecimals = (
  input: number | string,
  decimalPlaces: number = 2
): string => {
  // Convert input to a number if it's a string
  const numberValue = typeof input === 'string' ? parseFloat(input) : input;

  // Check if the converted value is a valid number
  if (isNaN(numberValue)) {
    return 'Invalid number';
  }

  // Extract integer and decimal parts
  const integerPart = Math.floor(numberValue);
  const decimalPart = (numberValue % 1).toFixed(decimalPlaces).slice(2);

  // Format the integer part with commas
  const numberWithCommas = integerPart
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Combine integer and decimal parts with a dot
  const formattedNumber =
    decimalPart.length > 0
      ? numberWithCommas + '.' + decimalPart
      : numberWithCommas;

  // Return the formatted number as a string
  return formattedNumber;
};

export const calculateDiscountPercentage = (
  costPrice: number,
  sellingPrice: number
): number => {
  if (costPrice <= 0 || sellingPrice <= 0) {
    return 0;
  }

  // Calculate the discount percentage
  const discount = costPrice - sellingPrice;
  const discountPercentage = (discount / costPrice) * 100;

  return discountPercentage;
};
