import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import { margins, dimensions } from '../../../assets/styles/variables';
import { styleTitle } from '../../../assets/styles/base';

type ImageSettingsProp = {
  selectedImageIndex: number,
  setPrimary: any,
  deleteImageConfirm: any,
  closeSelectedImageOverlay: any,
}

const ImageSettings: React.FC<ImageSettingsProp> = (
  {
    selectedImageIndex,
    setPrimary,
    deleteImageConfirm,
    closeSelectedImageOverlay,
  },
) => {
  return (
    <Overlay
      isVisible={selectedImageIndex > -1}
      windowBackgroundColor="rgba(255, 255, 255, 0.8)"
      overlayBackgroundColor="#fff"
      width="80%"
      height={dimensions.fullHeight * 0.25}
    >
      <View style={styles.selectedImageOverlay}>
        <Text style={styleTitle}>Kérlek válassz</Text>
        <View style={styles.imageOverlayButtonBox}>
          <View style={styles.imageOverlyButton}>
            <Button
              title="Kezdőképnek"
              onPress={setPrimary}
            />
          </View>
          <View style={styles.imageOverlyButton}>
            <Button
              title="Kép törlése"
              onPress={deleteImageConfirm}
              color="red"
            />
          </View>
        </View>
        <View style={styles.imageOverlyButton}>
          <Button
            title="Bezárás"
            onPress={closeSelectedImageOverlay}
          />
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  selectedImageOverlay: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageOverlayButtonBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageOverlyButton: {
    marginBottom: margins.sm,
  },
});

export default ImageSettings;
