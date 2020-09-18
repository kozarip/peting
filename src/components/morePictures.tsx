import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { SliderBox } from 'react-native-image-slider-box';
import LoveButtons from './loveButtons';
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
        <Card style={styles.card}>
          <Text style={styles.title}>
            {name}
            {', '}
            {age}
          </Text>
          <SliderBox
            images={personImages}
            parentWidth={dimensions.fullWidth * 0.8}
            sliderBoxHeight={dimensions.fullWidth * 0.8}
          />
          <Text style={styles.title}>{animalName}</Text>
          <SliderBox
            images={animalImages}
            parentWidth={dimensions.fullWidth * 0.8}
            sliderBoxHeight={dimensions.fullWidth * 0.8}
          />
          <Button
            buttonStyle={styleForm.btnPrimary}
            titleStyle={{ fontSize: fonts.heading2 }}
            title="Bezárás"
            onPress={handleClose}
          />
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
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
});

export default MorePictures;
