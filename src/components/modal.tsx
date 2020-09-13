import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Overlay, Button, Icon } from 'react-native-elements';
import { colors, fonts, margins, dimensions } from '../assets/styles/variables';

type modalProps = {
  isVisible: boolean,
  iconName: string,
  iconColor?: string,
  title?: string,
  height?: number,
  description?: string,
  buttonPrimaryText?: string,
  buttonSecondaryText?: string,
  handlePressButtonPrimary?: any,
  handlePressButtonSecondary?: any,
}

let overlayHeight = 'auto';

const Modal: React.FC<modalProps> = (
  {
    isVisible,
    iconName,
    iconColor,
    title,
    height,
    description,
    buttonPrimaryText,
    buttonSecondaryText,
    handlePressButtonPrimary,
    handlePressButtonSecondary,
  },
) => {
  if (height) {
    overlayHeight = height;
  };
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.modalContainer}
    >
      <Icon
        name={iconName}
        size={60}
        color={iconColor || colors.grey}
        type="font-awesome"
      />
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      <View style={styles.buttonContainer}>
        {
          buttonSecondaryText &&
          <Button
            buttonStyle={styles.btnSecondary}
            titleStyle={{ fontSize: fonts.heading2 }}
            title={buttonSecondaryText}
            onPress={handlePressButtonSecondary}
          />
        }
        {
          buttonPrimaryText &&
          <Button
            buttonStyle={styles.btnPrimary}
            titleStyle={{ fontSize: fonts.heading2 }}
            title={buttonPrimaryText}
            onPress={handlePressButtonPrimary}
          />
        }
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: margins.lg,
    paddingVertical: margins.lg,
    borderRadius: 20,
    width: dimensions.fullWidth * 0.9,
    height: overlayHeight,
    top: '-10%',
  },
  title: {
    textAlign: 'center',
    fontSize: 36,
    color: colors.primary,
    marginBottom: margins.sm,
  },
  description: {
    textAlign: 'center',
    fontSize: fonts.heading3,
    color: colors.separator,
    marginBottom: margins.sm,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  btnPrimary: {
    backgroundColor: colors.primary,
    color: '#fff',
    borderRadius: 20,
    marginBottom: margins.sm,
    paddingHorizontal: margins.sm,
  },
  btnSecondary: {
    backgroundColor: colors.separator,
    color: '#fff',
    borderRadius: 20,
    marginBottom: margins.sm,
    paddingHorizontal: margins.sm,
  },
});

export default Modal;
