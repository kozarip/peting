import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { dimensions, margins, colors } from '../../../assets/styles/variables';

type ImageListProps = {
  images: string[],
  primaryImageIndex: number,
  setSelectedImageIndex: any,
}

const ImageList: React.FC<ImageListProps> = (
  { images, primaryImageIndex, setSelectedImageIndex },
) => {
  return (
    <View style={styles.imageBox}>
      {
        images.map((image, i) => {
          const primaryClass = i === primaryImageIndex ? styles.primaryImage : {};
          return (
            <TouchableOpacity
              key={i}
              onLongPress={() => { setSelectedImageIndex(i); }}
            >
              <Image
                source={{ uri: image }}
                style={{ ...styles.image, ...primaryClass }}
              />
            </TouchableOpacity>
          );
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  imageBox: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: margins.sm,
  },
  image: {
    width: dimensions.fullWidth / 2.5,
    height: dimensions.fullWidth / 2.5,
    marginBottom: margins.sm,
  },
  primaryImage: {
    borderColor: colors.primary,
    borderWidth: 5,
  },
});

export default ImageList;
