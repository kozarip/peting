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
import { searchUsers } from '../graphql/queries';
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
    search.search(searchParams).then((res) => {
      console.log(res.data.searchUsers.items);
      setResult(res.data.searchUsers.items[0]);
    });
  }, [navigation]);

  const user = {
    userName: 'Peti',
    animalName: 'Zsömi',
    userProfileImage: require('../assets/images/elsa.jpg'),
    animalProfileImage: require('../assets/images/dog_sample.jpg'),
    age: 30,
    bio: 'Lorem Ipsum is simply dummy usertext of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of',
    details: [
      { Magasság: '188 cm' },
      { Dohányzás: 'Alkalmanként' },
      { Hobbi: 'Utazás, tenisz' },
    ],
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
