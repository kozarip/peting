import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import Search from '../services/search';
import PetingHeader from '../components/petingHeader';
import LoveButtons from '../components/loveButtons';
import { styleBackground, styleContainer } from '../assets/styles/base';
import { margins } from '../assets/styles/variables';
import { hairColor, smokeFrequency } from '../constants/userFields';
import PersonCard from '../components/personCard';

type ResultScreenProps = {
  navigation: any;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ navigation }) => {
  const image = require('../assets/images/pet_silhouettes2.jpg');
  const [result, setResult] = useState({
    userName: '',
    age: 20,
    animalName: '',
    bio: '',
    hairColor: '',
    hobbies: '',
    smokeFrequency: '',
    height: '',
    primaryImageIndex: 0,
    images: [require('../assets/images/elsa.jpg')],
    animalImages: [require('../assets/images/dog_sample.jpg')],
  });
  const { searchParams } = useSelector((state: RootState) => state);
  const search = new Search();

  useEffect(() => {
    console.log(searchParams);
    search.search(searchParams).then((res: any) => {
      const resultFromAPI = res.data.searchUsers.items[0];
      const resultWithValidValues = {};
      Object.keys(resultFromAPI).forEach((key) => {
        if (resultFromAPI[key]) {
          resultWithValidValues[key] = resultFromAPI[key];
        }
      });
      if (resultWithValidValues.hobbies) resultWithValidValues.hobbies = resultWithValidValues.hobbies.join(', ');
      if (resultWithValidValues.smokeFrequency) resultWithValidValues.smokeFrequency = getDetailText(resultWithValidValues.smokeFrequency, 'smokeFrequency');
      if (resultWithValidValues.hairColor) resultWithValidValues.hairColor = getDetailText(resultWithValidValues.hairColor, 'hairColor');
      setResult({ ...result, ...resultWithValidValues });
    });
  }, [navigation]);

  const getDetailText = (value, type) => {
    let itemObject;
    switch (type) {
      case 'hairColor':
        itemObject = hairColor.options.find((element) => element.value === value);
        break;
      case 'smokeFrequency':
        itemObject = smokeFrequency.options.find((element) => element.value === value);
        break;
      default:
        break;
    }
    return itemObject.label;
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.userContainer}>
        <PetingHeader
          navigation={navigation}
        />
        <View style={styles.profileBox}>
          <ImageBackground
            source={image}
            style={styleBackground}
            resizeMode="repeat"
            imageStyle={{ opacity: 0.04 }}
          >
            <PersonCard
              person={result}
              navigation={navigation}
            />
          </ImageBackground>
        </View>
      </ScrollView>
      <LoveButtons />
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    flexGrow: 1,
  },
  container: {
    ...styleContainer as any,
    alignItems: 'center',
  },
  profileCard: {
    marginHorizontal: 0,
    borderRadius: 10,
    marginBottom: margins.sm,
    paddingBottom: 25,
  },
  profileBox: {
    paddingHorizontal: margins.sm,
  },
  detailsBox: {
    display: 'flex',
    marginTop: 20,
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
});

export default ResultScreen;
