import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import { Card } from 'react-native-elements';

import TextBox from './form/textBox';
import Selector from './form/selector';
import MultiSelector from './form/multiSelector';
import CheckBox from './form/radioButton';

import { styleForm } from '../assets/styles/form';

import {
  gender,
  hairColor,
  animalType,
  animalSize,
  smokeFrequency,
  hobbies,
} from '../constants/userFields';

const SearchComponent: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Card
        containerStyle={styleForm.cardBlock}
        title="Alapadatok"
        titleStyle={styleForm.cardTitle as any}
      >
        <CheckBox label="nem" values={gender} />
      </Card>

      <Card
        containerStyle={styleForm.cardBlock}
        title="Kinézet"
        titleStyle={styleForm.cardTitle as any}
      >
        <TextBox label="Minimum magasság" value="160 cm" />
        <TextBox label="Maximum magasság" value="178 cm" />
        <Selector label={hairColor.label} options={hairColor.options} />
      </Card>

      <Card
        containerStyle={styleForm.cardBlock}
        title="Állatod"
        titleStyle={styleForm.cardTitle as any}
      >
        <Selector label={animalType.label} options={animalType.options} />
        <Selector label={animalSize.label} options={animalSize.options} />
      </Card>

      <Card
        containerStyle={styleForm.cardBlock}
        title="Egyéb"
        titleStyle={styleForm.cardTitle as any}
      >
        <Selector label={smokeFrequency.label} options={smokeFrequency.options} />
        <MultiSelector label="Hobbijaid" options={hobbies} />
      </Card>
      <Button
        title="Keresés"
        onPress={() => { console.log('search'); }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});

export default SearchComponent;
