import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import ImageBox from './imageBox';
import { margins, dimensions } from '../assets/styles/variables';

type ImagesBoxProps = {
  navigation: any;
  userProfileImage: any;
  animalProfileImage: any;
}

const ImagesBox: React.FC<ImagesBoxProps> = (
  { navigation, userProfileImage, animalProfileImage },
) => {
  return (
    <View style={styles.imageContainer}>
      <ImageBox
        type="person"
        source={userProfileImage}
        navigation={navigation}
      />
      <ImageBox
        type="animal"
        source={animalProfileImage}
        navigation={navigation}
      />
      <View style={styles.moreImageIcon}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Pictures')}
        >
          <Icon
            raised
            name="ios-images"
            size={20}
            color="#21618C"
            type="ionicon"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: margins.md,
    height: dimensions.fullWidth * 0.8,
  },
  moreImageIcon: {
    position: 'absolute',
    bottom: -3,
    right: -5,
    height: 52,
    width: 52,
  },
});

export default ImagesBox;
