import React from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import { colors, fonts, margins } from '../assets/styles/variables';

type emptyResultModalProps = {
  isOverlayActive: boolean;
  navigation: any;
  setIsOverlayActive;
}

const EmptyResultModal: React.FC<emptyResultModalProps> = ({
  navigation,
  isOverlayActive,
  setIsOverlayActive,
}) => {
  return (
    <View>
      <Overlay
        isVisible={isOverlayActive}
        windowBackgroundColor="rgba(255, 255, 255, 0.3)"
        overlayBackgroundColor="#fff"
        width="80%"
        height="50%"
      >
        <View
          style={styles.emptyResultBox}
        >
          <Text style={styles.emptyResultText}>
            Nincs a keresésnek megfelő személy
          </Text>
          <Button
            color={colors.darkPrimary}
            title="Vissza a kereséshez"
            onPress={
              () => {
                setIsOverlayActive(false);
                navigation.navigate('Settings', { newUser: false });
              }
            }
          />
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyResultBox: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyResultText: {
    fontSize: fonts.heading2,
    textAlign: 'center',
    marginBottom: margins.md,
  }
});

export default EmptyResultModal;
