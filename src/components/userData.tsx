import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { Card } from 'react-native-elements';
import TextBox from '../components/form/textBox';
import Selector from '../components/form/selector';
import { fonts, colors } from '../assets/styles/variables';
import { styleForm } from '../assets/styles/form';

const UserData = ({ isFullForm, isWithRange }) => {
/*   const [heightRange, setHeightRange] = useState(['140', '210']);
  const [ageRange, setAgeRange] = useState(['20', '80']); */

  const gender = [
    { label: 'Nő', value: 0 },
    { label: 'Férfi', value: 1 },
  ];

  const hairColor = {
    label: 'Hajszín',
    options: [
      { label: 'Szöke', value: 'blonde' },
      { label: 'Barna', value: 'brown' },
      { label: 'Vörös', value: 'red' },
    ],
  };

  const animalType = {
    label: 'Faja',
    options: [
      { label: 'Kutya', value: 'dog' },
      { label: 'Macska', value: 'cat' },
      { label: 'Hörcsög', value: 'hamster' },
      { label: 'Nyúl', value: 'rabbit' },
    ],
  };

  const animalSize = {
    label: 'Mérete',
    options: [
      { label: 'Kicsi', value: 'small' },
      { label: 'Közepes', value: 'medium' },
      { label: 'Nagy', value: 'big' },
    ],
  };
  const smokeFrequency = {
    label: 'Dohányzás',
    options: [
      { label: 'Soha', value: 'never' },
      { label: 'Alkalmanként', value: 'rarely' },
      { label: 'Rendszeresen', value: 'often' },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Card
        containerStyle={styleForm.cardBlock}
        title="Alapadatok"
        titleStyle={styleForm.cardTitle as any}
      >
        {isFullForm && <TextBox label="Név" value="Kozári Péter" />}
        {isFullForm && <TextBox label="E-mail" value="kozaripeti@gmail.com" /> }
        <Text style={styleForm.label as any}>
          Nem
        </Text>
        <RadioForm
          style={{ marginTop: 5, fontSize: fonts.heading3 }}
          buttonColor={colors.secondary}
          labelStyle={{ fontSize: fonts.heading3 }}
          selectedButtonColor={colors.secondary}
          buttonSize={15}
          radio_props={gender}
          initial={0}
        />
      </Card>

      <Card
        containerStyle={styleForm.cardBlock}
        title="Kinézet"
        titleStyle={styleForm.cardTitle as any}
      >
        {
          isWithRange
            ? (
              <View>
                <TextBox label="Minimum magasság" value="160 cm" />
                <TextBox label="Maximum magasság" value="178 cm" />
              </View>
            )
            : (
              <TextBox label="Magasság" placeholder="? cm" />
            )
        }
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
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});

export default UserData;
