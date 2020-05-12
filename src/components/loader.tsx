import React from 'react';
import { Overlay } from 'react-native-elements';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { fonts, dimensions, colors } from '../assets/styles/variables';

type LoaderProps= {
  isActive: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isActive }) => {
  return (
    <Overlay
      isVisible={isActive}
      windowBackgroundColor="rgba(255, 255, 255, 0.8)"
      overlayBackgroundColor="#fff"
      width="80%"
      height={dimensions.fullHeight * 0.4}
    >
      <View style={styles.loaderModal}>
        <ActivityIndicator size="large" color={colors.separator} />
        <Text style={styles.loaderText}>Adatok betöltése...</Text>
      </View>
    </Overlay>

  );
};

const styles = StyleSheet.create({
  loaderModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    fontSize: fonts.heading2,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Loader;
