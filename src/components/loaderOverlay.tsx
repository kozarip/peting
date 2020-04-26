import React from 'react';
import { Overlay } from 'react-native-elements';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { fonts, dimensions, colors } from '../assets/styles/variables';

type SuccessLoginOverlayProps= {
  isLoggedIn: boolean;
}

const SuccessLoginOverlay: React.FC<SuccessLoginOverlayProps> = ({ isLoggedIn }) => {
  return (
    <Overlay
      isVisible={isLoggedIn}
      windowBackgroundColor="rgba(255, 255, 255, 0.8)"
      overlayBackgroundColor="#fff"
      width="80%"
      height={dimensions.fullHeight * 0.4}
    >
      <View style={styles.successLoginModal}>
        <ActivityIndicator size="large" color={colors.separator} />
        <Text style={styles.successLoginText}>Adatok betöltése...</Text>
      </View>
    </Overlay>

  );
};

const styles = StyleSheet.create({
  successLoginModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successLoginText: {
    fontSize: fonts.heading2,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default SuccessLoginOverlay;
