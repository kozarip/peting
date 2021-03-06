import { fonts, colors, margins } from './variables';

export const styleForm = {
  cardBlock: {
    marginHorizontal: 10,
  },
  cardTitle: {
    fontSize: fonts.heading2,
    color: colors.grey,
    marginBottom: 15,
    marginTop: margins.lg,
    textAlign: 'center',
  },
  label: {
    fontSize: fonts.heading3,
    color: colors.grey,
    fontWeight: 'bold',
    marginBottom: margins.xsm,
  },
  cardInput: {
    marginBottom: 10,
    marginHorizontal: 0,
    fontSize: fonts.heading3,
    color: colors.separator,
  },
  textBoxContainer: {
    borderBottomWidth: 1,
    borderColor: '#d9d9d9',
    marginBottom: margins.sm,
  },
  mandatory: {
    color: colors.darkPrimary,
  },
  btnPrimary: {
    backgroundColor: colors.primary,
    color: '#fff',
    borderRadius: 20,
    padding: 10,
    marginBottom: margins.sm,
    marginTop: margins.sm,
  },
  checkBox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    margin: 0,
    padding: 0
  },
};
