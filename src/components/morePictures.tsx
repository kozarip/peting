import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import { Button, Tooltip, Icon } from 'react-native-elements';
import GallerySwiper from 'react-native-gallery-swiper';
import { styleTitle } from '../assets/styles/base';
import { margins, dimensions, colors, fonts } from '../assets/styles/variables';
import { styleForm } from '../assets/styles/form';


const MorePictures = (props) => {
  const personImages = props.allImages.split(',');
  const animalImages = props.allAnimalImages.split(',');
  const name = props.name || '';
  const age = props.age > 0 ? props.age : '';
  const animalName = props.animalName || '';
  const { handleClose } = props;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {name}
            {', '}
            {age}
          </Text>
          <Tooltip
            backgroundColor={colors.primary}
            height={80}
            width={dimensions.fullWidth * 0.8}
            popover={
              <Text style={styles.infoText}>
                A képeket két ujjal tudod nagyítani.
              </Text>
            }
          >
            <Icon
              name="info"
              size={12}
              raised
              color={colors.primary}
              type="font-awesome"
            />
          </Tooltip>
        </View>
        <GallerySwiper
          renderIndicator={(currentIndex, allSize) => ( <Text style={{ alignSelf: 'center', position: 'absolute', top: 10 }}> {currentIndex + '/' + allSize} </Text> )}
          style={styles.slider}
          enableTranslate={false}
          pageMargin={margins.sm}
          images={personImages.map((image) => { return { uri: image }; })}
        />
        <GallerySwiper
          style={styles.slider}
          enableTranslate={false}
          pageMargin={margins.sm}
          images={animalImages.map((image) => { return { uri: image }; })}
        />
        <Button
          buttonStyle={{ ...styleForm.btnPrimary, ...{ marginHorizontal: 50 } }}
          titleStyle={{ fontSize: fonts.heading2 }}
          title="Bezárás"
          onPress={handleClose}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: margins.md,
  },
  title: {
    ...styleTitle as any,
    marginTop: margins.sm,
    textAlign: 'center',
    color: colors.grey,
  },
  button: {
    marginTop: margins.sm,
  },
  slider: {
    width: dimensions.fullWidth,
    height: dimensions.fullWidth,
    marginBottom: margins.lg,
  },
  infoText: {
    color: '#fff',
  },
});

export default MorePictures;
