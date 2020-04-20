import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Icon } from 'react-native-elements';
import AuthService from '../services/auth';
import PetingHeader from '../components/petingHeader';
import LoveButtons from '../components/loveButtons';
import Bio from '../components/bio';
import Details from '../components/details';
import ProfileTitle from '../components/profileTitle';
import ImageBox from '../components/imageBox';

const { width } = Dimensions.get('window');

type ResultScreenProps = {
  navigation: any;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ navigation }) => {
  const image = require('../assets/images/pet_silhouettes2.jpg');

  const user = {
    userName: 'Peti',
    animalName: 'Zsömi',
    userProfileImage: require('../assets/images/elsa.jpg'),
    animalProfileImage: require('../assets/images/dog_sample.jpg'),
    age: 30,
    bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of',
    details: [
      { height: '188 cm' },
      { smoke: 'Alkalmanként' },
      { hobby: 'Utazás, tenisz' },
    ],
  };

  return (
    <ScrollView style={styles.userContainer}>
      <PetingHeader
        navigation={navigation}
      />
      <View style={styles.profileBox}>
        <ImageBackground
          source={image}
          style={styles.background}
          resizeMode="repeat"
          imageStyle={{ opacity: 0.04 }}
        >
          <View style={styles.imageContainer}>
            <ImageBox
              type="person"
              source={user.userProfileImage}
              navigation={navigation}
            />
            <ImageBox
              type="animal"
              source={user.animalProfileImage}
              navigation={navigation}
            />
            <TouchableOpacity
              style={styles.moreImageIcon}
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
          <ProfileTitle
            name={user.userName}
            age={user.age}
          />
          <ProfileTitle
            name={user.animalName}
            smallFont
          />
          <Bio bio={user.bio} />
          <Details details={user.details} />
          <Button title="Logout" onPress={AuthService.logout} />
          <LoveButtons />
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    flexGrow: 1,
  },
  background: {
    width: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#1a1a1a',
  },
  profileBox: {
    paddingHorizontal: 10,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    height: width * 0.8,
  },
  moreImageIcon: {
    position: 'absolute',
    bottom: 5,
    right: 25,
    height: 30,
    width: 30,
  },
  dogName: {
    fontSize: 19,
  },
  detailsBox: {
    display: 'flex',
    marginTop: 20,
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
});

export default ResultScreen;
