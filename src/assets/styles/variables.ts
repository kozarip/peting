
import { Dimensions } from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
  third: Dimensions.get('window').width * 0.3333,
};

export const colors = {
  primary: '#fe4040',
  darkPrimary: '#bf2626',
  grey: '#414141',
  separator: '#999',
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
