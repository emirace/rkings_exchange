import { Dimensions, PixelRatio } from 'react-native';

const referenceScreenWidth = 428; // iPhone 12 Pro Max width
const referenceScreenHeight = 926; // iPhone 12 Pro Max height

export const getResponsiveFontSize = (fontSize: number) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const screenPixelDensity = PixelRatio.get();

  // Reference screen size of iPhone 12 Pro Max
  const baseScreenWidth = 1284;
  const baseScreenHeight = 2778;

  // Calculate width and height ratios
  const widthRatio = screenWidth / baseScreenWidth;
  const heightRatio = screenHeight / baseScreenHeight;

  // Calculate responsive font size
  const responsiveFontSize = PixelRatio.roundToNearestPixel(
    fontSize * Math.min(widthRatio, heightRatio) * screenPixelDensity
  );

  return responsiveFontSize;
};

export const getResponsiveWidth = (width: number) => {
  const screenWidth = Dimensions.get('window').width;
  const widthRatio = screenWidth / referenceScreenWidth;

  return PixelRatio.roundToNearestPixel(width * widthRatio);
};

export const getResponsiveHeight = (height: number) => {
  const screenHeight = Dimensions.get('window').height;
  const heightRatio = screenHeight / referenceScreenHeight;

  return PixelRatio.roundToNearestPixel(height * heightRatio);
};
