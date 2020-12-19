import { Linking } from 'react-native';
import { dimensions } from '../assets/styles/variables';

export const isSmallScreen = () => {
  return dimensions.fullHeight < 650 || dimensions.fullWidth < 360;
};

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line one-var
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const openLink = (url) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      alert("Don't know how to open URI: " + url);
    }
  });
};
