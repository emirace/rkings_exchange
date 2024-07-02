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

export const formatNumberWithCommasAndDecimals = (
  input: number | string,
  significantFigures: number = 2
): string => {
  // Convert input to a number if it's a string
  const numberValue = typeof input === 'string' ? parseFloat(input) : input;

  // Check if the converted value is a valid number
  if (isNaN(numberValue)) {
    return 'Invalid number';
  }

  // Extract integer and decimal parts
  const integerPart = Math.floor(numberValue);
  const decimalPart = numberValue % 1;
  // Calculate the magnitude of the number
  const magnitude = Math.floor(Math.log10(Math.abs(decimalPart)));

  // Calculate the multiplier for the significant figures
  const multiplier = Math.pow(10, significantFigures - 1 - magnitude);

  // Round the number to the nearest significant figure
  const roundedDecimalPart =
    decimalPart === 0 ? 0 : Math.round(decimalPart * multiplier) / multiplier;

  // Combine integer and rounded decimal parts correctly
  const roundedValue = integerPart + roundedDecimalPart;
  // Convert the rounded value to string
  let formattedNumber = roundedValue.toString();

  // If formatted number is in scientific notation, convert it to fixed notation
  if (formattedNumber.includes('e')) {
    formattedNumber = roundedValue.toFixed(significantFigures - 1);
  }

  // If formatted number has decimal places, remove trailing zeros
  if (formattedNumber.includes('.')) {
    formattedNumber = formattedNumber.replace(/\.?0+$/, '');
  }

  // Format the integer part with commas
  formattedNumber = formattedNumber
    .split('.')
    .map((part, index) =>
      index === 0 ? part.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : part
    )
    .join('.');

  // Return the formatted number as a string
  return formattedNumber;
};
