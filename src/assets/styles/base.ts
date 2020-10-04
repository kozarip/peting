import { fonts, margins, colors, dimensions } from './variables';

export const styleBackground = {
  flex: 1,
  backgroundColor: '#808080',
  borderTopWidth: 0,
  margin: 0,
  padding: 0,
  minHeight: dimensions.fullHeight - 70,
};

export const styleContainer = {
  flex: 1,
  width: '100%',
  height: '100%',
  flexDirection: 'row',
  alignItems: 'center',
};

export const styleBox = {
  flex: 1,
  marginTop: margins.md,
};

export const styleTitle = {
  color: '#fff',
  marginLeft: margins.sm,
  fontSize: fonts.heading1,
  marginBottom: margins.sm,
  paddingHorizontal: margins.md,
};
