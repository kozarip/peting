
import { Dimensions } from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
  third: Dimensions.get('window').width * 0.3333,
};

export const colors = {
  primary: '#0F52BA',
  separator: '#BBBBBB',
  facebook: '#4267B2',
  google: '#DB4437',
};

export const margins = {
  xsm: 5,
  sm: 10,
  md: 20,
  lg: 30,
};

export const fonts = {
  default: 16,
  heading1: 28,
  heading2: 20,
  heading3: 18,
};
