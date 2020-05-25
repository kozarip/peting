import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Search from '../services/search';
import PetingHeader from '../components/petingHeader';
import LoveButtons from '../components/loveButtons';
import Bio from '../components/bio';
import Details from '../components/details';
import ProfileTitle from '../components/profileTitle';
import { styleBackground, styleContainer } from '../assets/styles/base';
import { margins } from '../assets/styles/variables';
import ImagesBox from '../components/ImagesBox';
import { hairColor, smokeFrequency } from '../constants/userFields';

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
    hobbies: [],
    smokeFrequency: '',
    height: '',
  });
  const { searchParams } = useSelector((state: RootState) => state);
  const search = new Search();

  useEffect(() => {
    search.search(searchParams).then((res: any) => {
      const resultFromAPI = res.data.searchUsers.items[0];
      if (resultFromAPI.hobbies) {
        resultFromAPI.hobbies = resultFromAPI.hobbies.join(', ');
      }
      resultFromAPI.smokeFrequency = getDetailText(resultFromAPI.smokeFrequency, 'smokeFrequency');
      resultFromAPI.hairColor = getDetailText(resultFromAPI.hairColor, 'hairColor');
      console.log(resultFromAPI);
      setResult(resultFromAPI);
    });
  }, [navigation]);

  const user = {
    userProfileImage: require('../assets/images/elsa.jpg'),
    animalProfileImage: require('../assets/images/dog_sample.jpg'),
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
          <ImageBackground
            source={image}
            style={styleBackground}
            resizeMode="repeat"
            imageStyle={{ opacity: 0.04 }}
          >
            <Card
              containerStyle={styles.profileCard}
            >
              <ImagesBox
                navigation={navigation}
                animalProfileImage={user.animalProfileImage}
                userProfileImage={user.userProfileImage}
              />
              <ProfileTitle
                name={result.userName}
                age={result.age}
              />
              <ProfileTitle
                name={result.animalName}
                smallFont
              />
              <Bio bio={result.bio} />
              <Details details={
                [
                  { Magasság: result.height },
                  { Dohányzás: result.smokeFrequency },
                  { Hajszín: result.hairColor },
                  { Hobbik: result.hobbies },
                ]
              }
              />
            </Card>
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
