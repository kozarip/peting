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
} from 'react-native';
import { Icon } from 'react-native-elements';
import AuthService from '../services/auth';
import PetingHeader from '../components/petingHeader';

const { width, height } = Dimensions.get('window');
console.log(width, height);

const ResultScreen = ({ navigation }) => {
  // @ts-ignore
  const [user, setUser] = useState<{ user: null | object }>({});

  useEffect(() => {
    AuthService.subscribeAuthChange((receivedUser) => setUser(receivedUser));
  });

  const image = require('../assets/images/pet_silhouettes2.jpg');

  const name = user.displayName;
  /* const avatar = user.photoURL && (
    <Image style={{ width: 50, height: 50 }} source={{ uri: user.photoURL }} />
  ); */

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
          <View style={styles.bioBox}>
            <Text style={styles.bio}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
            </Text>
          </View>
          <View style={styles.detailsBox}>
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
          </View>
          <View style={styles.reviewBox}>
            <TouchableOpacity>
              <Icon
                name="times-circle"
                size={35}
                color="#000000"
                type="font-awesome"
                raised
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="heart"
                size={35}
                color="#FF0000"
                type="font-awesome"
                raised
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="chevron-circle-right"
                size={35}
                color="#008080"
                type="font-awesome"
                raised
              />
            </TouchableOpacity>
          </View>
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
  bioBox: {
    display: 'flex',
    marginTop: 10,
  },
  bio: {
    fontSize: 15,
  },
  detailsBox: {
    display: 'flex',
    marginTop: 20,
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  detail: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#bbbbbb',
  },
  detailKey: {
    fontSize: 16,
  },
  detailValue: {
    fontSize: 16,
  },
  reviewBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default ResultScreen;
