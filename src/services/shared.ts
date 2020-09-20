import { dimensions } from '../assets/styles/variables';

export const isSmallScreenByHeight = () => {
  return dimensions.fullHeight < 600;
};