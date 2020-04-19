import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
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
//import Detail from '../components/detail';

const { width } = Dimensions.get('window');

const ResultScreen: React.FC = ({ navigation }) => {
  const image = require('../assets/images/pet_silhouettes2.jpg');
  const name = 'sad';

  const user = {
    images: {
      profile: [
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree',

      ],
      animal: [
        require('../assets/images/dog_sample.jpg'),
        'https://source.unsplash.com/1024x768/?nature',
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree',

      ],
    },
    userName: 'Peti',
    animalName: 'Zsömi',
    age: 30,
    bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of',
    details: [
      { magasság: '188cm' },
      { dohányzás: 'Alkalmanként' },
      { hobbi: 'Utazás, tenisz' },
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
          <View style={styles.imageBox}>
            <TouchableOpacity style={styles.profileImageTouchBox} onPress={() => navigation.navigate('Pictures')}>
              <Image
                resizeMode="contain"
                style={styles.profileImage}
                source={require('../assets/images/elsa.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dogImageTouchBox} onPress={() => navigation.navigate('Pictures')}>
              <Image
                resizeMode="contain"
                style={styles.dogImage}
                source={require('../assets/images/dog_sample.jpg')}
              />
            </TouchableOpacity>
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
          <View style={styles.mainDataBox}>
            <Text style={styles.name}>
              {name}
              ,
            </Text>
            <Text style={styles.name}>30</Text>
          </View>
          <View>
            <Text style={styles.dogName}>Zsömi</Text>
          </View>
          <Bio bio={user.bio} />
          <View style={styles.detail}>
            <Text style={styles.detailKey}>Magasság</Text>
            <Text style={styles.detailValue}>188 cm</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailKey}>Dohányzás</Text>
            <Text style={styles.detailValue}>Alkalmanként</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailKey}>Hobbi</Text>
            <Text style={styles.detailValue}>utazás, kirándulás, kosár</Text>
          </View>
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
  imageBox: {
    position: 'relative',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    height: width * 0.8,
  },
  profileImageTouchBox: {
    position: 'absolute',
    bottom: 0,
  },
  dogImageTouchBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  profileImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
  },
  dogImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
  },
  moreImageIcon: {
    position: 'absolute',
    bottom: 5,
    right: 25,
    height: 30,
    width: 30,
  },
  mainDataBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  name: {
    fontSize: 28,
    marginRight: 10,
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
