import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Overlay, Button, Icon } from 'react-native-elements';
import { colors, fonts, margins, dimensions } from '../assets/styles/variables';
import { styleForm } from '../assets/styles/form';

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
  handleClose?: any,
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
    handleClose,
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
      <View>
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
              buttonStyle={{...styleForm.btnPrimary, ...styles.noTopMargin}}
              titleStyle={{ fontSize: fonts.heading2 }}
              title={buttonPrimaryText}
              onPress={handlePressButtonPrimary}
            />
          }
        </View>
        {
          handleClose &&
          <Button
            buttonStyle={styles.btnSecondary}
            titleStyle={{ fontSize: fonts.heading2 }}
            title="Bezárás"
            onPress={handleClose}
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
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
  },
  btnSecondary: {
    backgroundColor: colors.separator,
    color: '#fff',
    borderRadius: 20,
    padding: 10,
    marginBottom: margins.sm,
  },
  noTopMargin: {
    marginTop: 0,
  },
});

export default Modal;
