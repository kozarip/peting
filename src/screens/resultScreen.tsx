import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
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
import { styleBackground, styleContainer } from '../assets/styles/base';
import { fonts, dimensions, margins } from '../assets/styles/variables';

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
          style={styleBackground}
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
  container: {
    ...styleContainer as any,
    alignItems: 'center',
  },
  profileBox: {
    paddingHorizontal: margins.sm,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    marginTop: margins.md,
    marginBottom: margins.md,
    paddingHorizontal: margins.sm,
    height: dimensions.fullWidth * 0.8,
  },
  moreImageIcon: {
    position: 'absolute',
    bottom: 5,
    right: 25,
    height: 30,
    width: 30,
  },
  dogName: {
    fontSize: fonts.heading2,
  },
  detailsBox: {
    display: 'flex',
    marginTop: 20,
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
});

export default ResultScreen;
