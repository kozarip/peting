import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Icon, Button } from 'react-native-elements';
import Search from '../services/search';
import Chat from '../services/chat';
import User from '../services/user';
import { uuidv4 } from '../services/shared';
import {
  saveNewMatch,
  subscriptionMatch,
  subscriptionMyFutureMatches,
} from '../services/match';
import PetingHeader from '../components/petingHeader';
import LoveButtons from '../components/loveButtons';
import { styleBackground, styleContainer } from '../assets/styles/base';
import {
  margins,
  dimensions,
  colors,
  fonts,
} from '../assets/styles/variables';
import PersonCard from '../components/personCard';
import { setUser, setMatches, setActiveMenuId, addMatch } from '../store/action';
import HeaderTriangle from '../components/headerTriangle';
import Modal from '../components/modal';
import { styleForm } from '../assets/styles/form';

type ResultScreenProps = {
  navigation: any;
}

const initialResultPerson = {
  userName: '',
  age: -1,
  animalName: '',
  bio: '',
  hairColor: '',
  hobbies: '',
  cognitoUserName: '',
  smokeFrequency: '',
  height: '',
  primaryImageIndex: 0,
  images: [],
  animalImages: [],
};

const ResultScreen: React.FC<ResultScreenProps> = ({ navigation, route }) => {
  const image = require('../assets/images/background.png');
  const pressedButton = route.params ? route.params.pressedButton : '';

  const { searchParams, user, matches } = useSelector((state: any) => state);

  const [resultPersons, setResultPersons] = useState([]);
  const [resultPersonIndex, setResultPersonIndex] = useState(0);
  const [resultPerson, setResultPerson] = useState(initialResultPerson);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [isMatchModalActive, setIsMatchModalActive] = useState(false);
  const [emotionsWithTheResultPerson, setEmotionsWithTheResultPerson] = useState([]);
  const [userSubscribes, setUserSubscribes] = useState([]);

  const search = new Search();
  const chat = new Chat();
  const userClass = new User();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoaderActive(false);
    setResultPerson(initialResultPerson);
    setResultPersonIndex(0);
    let likedUSers = [];
    let dislikedUSers= []
    if(searchParams.isWithMarked){
      likedUSers = user.likes.map((like) => like.cognitoUserName)
      dislikedUSers = user.dislikes.map((dislike) => dislike.cognitoUserName)
    }
    const matchedUsers = matches.map((match) => match.cognitoUserName);
    const exceptUsers = { 
      exceptUsers: [...[user.cognitoUserName], ...matchedUsers, ...likedUSers, ...dislikedUSers] 
    };
    const city = { lat: user.cityLat, lng: user.cityLng };
    search.search({ ...searchParams, ...exceptUsers }, city).then((res: any) => {
      userSubscribes.forEach(subscribe => {
        subscribe.unsubscribe();
      });
      if (pressedButton) {
        if (typeof ResultScreen.loveButtonHandlers[pressedButton] === 'function') {
          ResultScreen.loveButtonHandlers[pressedButton]
        }
      }
      const { items } = res.data.searchUsers;

      setResultPersons(items.sort( () => Math.random() - 0.5));
      if (items.length !== 0) {
        if (resultPersonIndex > resultPersons.length - 1) {
          setResultPersonIndex(0);
        }
        setCurrentResultPerson(0, items);
      }
      const subscribes = [];
      items.forEach((item) => {
        subscribes.push(userClass.subscribeToUser(item.id, updateResultPerson, items));
      });
      setUserSubscribes(subscribes);
      setIsLoaderActive(false);
    });

    matches.forEach((match) => {
      subscriptionMatch(match, changeGlobalStateMatch);
    });
    subscriptionMyFutureMatches(user.cognitoUserName, addNewMatch);
  }, [searchParams, pressedButton, matches]);

  const changeGlobalStateMatch = (match) => {
    const newMatches = matches.map((m) => {
      if (m.id === match.id) {
        return match;
      }
      return m;
    });
    dispatch(setMatches(newMatches));
  };

  const addNewMatch = (matchData) => {
    setIsMatchModalActive(true);
    dispatch(addMatch(matchData));
  };

  const updateResultPerson = (rawPerson, items) => {
    if (items && items.length > 0) {
      const newResultPersons = items.map((person) => {
        if (person.cognitoUserName === rawPerson.cognitoUserName) {
          return updatePersonAttributes(person, rawPerson);
        }
        return person;
      });
      setResultPersons([...resultPersons, ...newResultPersons]);
      setCurrentResultPerson(resultPersonIndex, newResultPersons);
    }
  };

  const updatePersonAttributes = (person, rawPerson) => {
    const updatablePerson = person;
    Object.keys(updatablePerson).forEach((key) => {
      if (rawPerson[key] && updatablePerson[key] !== rawPerson[key]) {
        updatablePerson[key] = rawPerson[key];
      }
    });
    return updatablePerson;
  };

  const setCurrentResultPerson = (personIndex, persons?) => {
    const resultFromAPI = persons ? persons[personIndex] : resultPersons[personIndex];
    const resultWithValidValues = {};
    if (resultFromAPI) {
      Object.keys(resultFromAPI).forEach((key) => {
        if (resultFromAPI[key]) {
          resultWithValidValues[key] = resultFromAPI[key];
        }
      });
      setResultPerson({ ...initialResultPerson, ...resultWithValidValues });
      setEmotionsWithTheResultPerson(connectedEmotions(resultWithValidValues.cognitoUserName));
    }
  };

  const handlePressNext = () => {
    let index = resultPersonIndex;
    if (resultPersonIndex < resultPersons.length - 1) {
      setResultPersonIndex((prev) => prev + 1 );
      index = resultPersonIndex + 1;
    } else {
      setResultPersonIndex(0);
      index = 0;
    }
    if(resultPersons.length > 0){
      setCurrentResultPerson(index);
    }
  };

  const handlePressLike = () => {
    if (resultPerson.cognitoUserName) {
      user.likes = createEmotionObject(user.likes, resultPerson.cognitoUserName);
      // user.likedUsers = null;
      checkMatch();
      dispatch(setUser(user));
    }
    handlePressNext();
  };

  const handlePressDislike = () => {
    if (resultPerson.cognitoUserName) {
      user.dislikes = createEmotionObject(user.dislikes, resultPerson.cognitoUserName);
      // user.disLikedUsers = null;
      dispatch(setUser(user));
    }
    handlePressNext();
  };

  ResultScreen.loveButtonHandlers = {
    handlePressDislike,
    handlePressLike,
    handlePressNext,
  };

  const createEmotionObject = (array, userId) => {
    const resultArray = array || [];
    if (!resultArray.find((obj) => obj.cognitoUserName === userId)) {
      resultArray.push({ cognitoUserName: userId, timestamp: new Date() });
    }
    return resultArray;
  };

  const checkMatch = () => {
    if (resultPerson.likes
      && Array.isArray(resultPerson.likes)
      && resultPerson.likes.find((obj) => obj.cognitoUserName === user.cognitoUserName)) {
      setIsMatchModalActive(true);
      const id = uuidv4();

      const matchData: matchType = {
        id,
        cognitoUserName: resultPerson.cognitoUserName,
        name: resultPerson.userName,
        avatar_url: resultPerson.images[resultPerson.primaryImageIndex],
        subtitle: new Date().toISOString().split('T', 1).join(''),
        lastNewMessageSender: '',
      };
      dispatch(addMatch(matchData));
      chat.createNewChat({
        user1: user.cognitoUserName,
        user2: resultPerson.cognitoUserName,
        messages: [],
      });
      saveNewMatch({
        id,
        user1: user.cognitoUserName,
        user2: resultPerson.cognitoUserName,
        timestamp: new Date(),
      });
    }
  };

  const connectedEmotions = (userName) => {
    const resultUserName = userName || resultPerson.cognitoUserName;
    const emotionArrayNames = ['likes', 'dislikes'];
    const result = [];
    let isExist = false;
    emotionArrayNames.forEach((emotionName) => {
      if (user[emotionName]) {
        isExist = Boolean(user[emotionName].find(
          (emotionObj) => emotionObj.cognitoUserName === resultUserName,
        ));
      }
      if (isExist) {
        result.push(emotionName);
      }
    });
    return result;
  };

  const handlePressConectedEmotions = (emotionArrayName) => {
    const newEmotions = user[emotionArrayName].filter(
      (emotion) => emotion.cognitoUserName !== resultPerson.cognitoUserName,
    );
    user[emotionArrayName] = newEmotions;
    dispatch(setUser(user));
    setEmotionsWithTheResultPerson([]);
  };

  const isHasResult = () => {
    return resultPerson.age > -1 && resultPerson.userName !== '';
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.userContainer}>
        <View>
          <Modal
            iconName="spinner"
            isVisible={isLoaderActive}
            description="Adatok betöltése..."
          />
          <ImageBackground
            source={image}
            style={styleBackground}
            resizeMode="repeat"
            imageStyle={{ opacity: 0.3 }}
          >
            <PetingHeader
              navigation={navigation}
            />
            <HeaderTriangle />
            <Modal
              isVisible={isMatchModalActive}
              title="Match!"
              description="Gratulálunk, jó randit!"
              buttonSecondaryText="Bezárás"
              iconName="heart"connectedEmotions
              iconColor={colors.primary}
              handlePressButtonSecondary={() => { setIsMatchModalActive(false); }}
            />
            {isHasResult() ?
              <PersonCard
                person={resultPerson}
                navigation={navigation}
                connectedEmotions={emotionsWithTheResultPerson}
                handlePressConectedEmotions={handlePressConectedEmotions}
              />
              :
              <Card containerStyle={styles.noResultBox}>
                <Icon
                  name="search"
                  size={60}
                  color={colors.grey}
                  type="font-awesome"
                />
                <Text style={styles.title}>Nincs a keresésnek megfelő személy :(</Text>
                <Button
                  buttonStyle={styleForm.btnPrimary}
                  titleStyle={{ fontSize: fonts.heading2 }}
                  title="Vissza a kereséshez"
                  onPress={() => {
                    dispatch(setActiveMenuId(3));
                    navigation.navigate('Settings', { newUser: false });
                  }}
                />
              </Card>
            }
            {
              isHasResult() &&
              <LoveButtons
                isShowEmotionButtons={emotionsWithTheResultPerson.length === 0}
                handlePressLike={handlePressLike}
                handlePressNext={handlePressNext}
                handlePressDislike={handlePressDislike}
              />
            }
          </ImageBackground>
        </View>
      </ScrollView>
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
  detailsBox: {
    display: 'flex',
    marginTop: 20,
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  noResultBox: {
    height: dimensions.fullHeight * 0.79,
    paddingTop: margins.lg,
    marginBottom: margins.lg,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    color: colors.grey,
    marginTop: margins.lg,
  },
});

export default ResultScreen;
