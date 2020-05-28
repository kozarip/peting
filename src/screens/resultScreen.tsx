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
import Loader from '../components/loader';

type ResultScreenProps = {
  navigation: any;
}

const initialResultPerson = {
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
};

const ResultScreen: React.FC<ResultScreenProps> = ({ navigation }) => {
  const image = require('../assets/images/pet_silhouettes2.jpg');

  const [resultPersons, setResultPersons] = useState([]);
  const [resultPersonIndex, setResultPersonIndex] = useState(0);
  const [resultPerson, setResultPerson] = useState(initialResultPerson);
  const { searchParams } = useSelector((state: RootState) => state);
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  const search = new Search();

  useEffect(() => {
    console.log(searchParams);
    setIsLoaderActive(true);
    search.search(searchParams).then((res: any) => {
      setResultPersons(res.data.searchUsers.items);
      setCurrentResultPerson(resultPersonIndex, res.data.searchUsers.items);
      setResultPersonIndex(resultPersonIndex + 1);
      setIsLoaderActive(false);
    });
  }, [searchParams]);

  const setCurrentResultPerson = (personIndex, persons?) => {
    const resultFromAPI = persons ? persons[personIndex] : resultPersons[personIndex];
    const resultWithValidValues = {};
    if (resultFromAPI) {
      Object.keys(resultFromAPI).forEach((key) => {
        if (resultFromAPI[key]) {
          resultWithValidValues[key] = resultFromAPI[key];
        }
      });
      if (resultWithValidValues.hobbies) resultWithValidValues.hobbies = resultWithValidValues.hobbies.join(', ');
      if (resultWithValidValues.smokeFrequency) resultWithValidValues.smokeFrequency = getDetailText(resultWithValidValues.smokeFrequency, 'smokeFrequency');
      if (resultWithValidValues.hairColor) resultWithValidValues.hairColor = getDetailText(resultWithValidValues.hairColor, 'hairColor');
      setResultPerson({ ...initialResultPerson, ...resultWithValidValues });
    }
  };

  const handlePressNext = () => {
    console.log(resultPersonIndex, resultPersons.length);
    if (resultPersonIndex < resultPersons.length - 1) {
      setResultPersonIndex(resultPersonIndex + 1);
    } else {
      setResultPersonIndex(0);
    }
    setCurrentResultPerson(resultPersonIndex);
  };

  const handlePressLike = () => {
    console.log('Like');
  };

  const handlePressDislike = () => {
    console.log('Dislike');
  };

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
          <Loader isActive={isLoaderActive} />
          <ImageBackground
            source={image}
            style={styleBackground}
            resizeMode="repeat"
            imageStyle={{ opacity: 0.04 }}
          >
            <PersonCard
              person={resultPerson}
              navigation={navigation}
            />
          </ImageBackground>
        </View>
      </ScrollView>
      <LoveButtons
        handlePressLike={handlePressLike}
        handlePressNext={handlePressNext}
        handlePressDislike={handlePressDislike}
      />
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
