import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import { Button, Tooltip, Icon } from 'react-native-elements';
import GallerySwiper from 'react-native-gallery-swiper';
import { SliderBox } from 'react-native-image-slider-box';
import { localizations } from '../services/localizations';
import { styleTitle } from '../assets/styles/base';
import { margins, dimensions, colors, fonts } from '../assets/styles/variables';
import { styleForm } from '../assets/styles/form';

const MorePictures = (props) => {
  const personImages = props.allImages.split(',');
  const animalImages = props.allAnimalImages.split(',');
  const name = props.name || '';
  const animalName = props.animalName || '';
  const { handleClose } = props;
  const [acticveImageNumber, setActicveImageNumber] = useState(1);
  const [acticveAnimalImageNumber, setActicveAnimalImageNumber] = useState(1);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {name}
          </Text>
          <Tooltip
            backgroundColor={colors.primary}
            height={120}
            width={dimensions.fullWidth * 0.8}
            popover={
              <Text style={styles.infoText}>
                {localizations.t('imageZoomInfo')}
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
        <SliderBox
          resizeMethod="resize"
          resizeMode="cover"
          images={personImages}
          parentWidth={dimensions.fullWidth}
          sliderBoxHeight={dimensions.fullWidth}
        />
        {/* <Text style={styles.counter}>{acticveImageNumber} / {personImages.length}</Text> */}
        <Text style={styles.title}>
          {animalName}
        </Text>
        <SliderBox
          resizeMethod="resize"
          resizeMode="cover"
          images={animalImages}
          parentWidth={dimensions.fullWidth}
          sliderBoxHeight={dimensions.fullWidth}
        />
        {/* <Text style={styles.counter}>{acticveAnimalImageNumber} / {animalImages.length}</Text> */}
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
    marginBottom: margins.xsm,
  },
  infoText: {
    color: '#fff',
  },
  counter: {
    color: colors.separator,
  },
});

export default MorePictures;
