/* eslint-disable */
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
import { localizations } from '../services/localizations';
import { uuidv4 } from '../services/shared';
import {
  saveNewMatch,
  subscriptionMatch,
  subscriptionMyFutureMatches,
  subscriptionRemoveMatch,
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
import { setUser, setMatches, setActiveMenuId, addMatch, setHasNotification } from '../store/action';
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
let oldMatchesNumber = 0;
let matchNumberChanged = false;

const ResultScreen: React.FC<ResultScreenProps> = ({ navigation, route }) => {
  const image = require('../assets/images/background.png');
  const pressedButton = route.params ? route.params.pressedButton : '';

  const { searchParams, user, matches } = useSelector((state: any) => state);

  const [resultPersons, setResultPersons] = useState([]);
  const [updatedPersons, setUpdatedPersons] = useState([]);
  const [resultPersonIndex, setResultPersonIndex] = useState(0);
  const [resultPerson, setResultPerson] = useState(initialResultPerson);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [isMatchModalActive, setIsMatchModalActive] = useState(false);
  const [emotionsWithTheResultPerson, setEmotionsWithTheResultPerson] = useState([]);
  const [userSubscribes, setUserSubscribes] = useState([]);
  const [nextToken, setNextToken] = useState('');
  const [reSearch, setReSearch] = useState(false);
  const [isResultEnd, setIsResultEnd] = useState(false);

  const search = new Search();
  const chat = new Chat();
  const userClass = new User();
  const dispatch = useDispatch();

  if (oldMatchesNumber !== matches.length) {
    matchNumberChanged = !matchNumberChanged;
  }
  oldMatchesNumber = matches.length;
  useEffect(() => {
    setResultPerson(initialResultPerson);
    setResultPersonIndex(0);
    let likedUsers = [];
    let dislikedUsers = [];
    if (userHasFilledProfie()) {
      setIsLoaderActive(true);
      if (searchParams && searchParams.isWithMarked) {
        if (user.likes) {
          likedUsers = user.likes.map((like) => like.cognitoUserName)
        }
        if (user.dislikes) {
          dislikedUsers = user.dislikes.map((dislike) => dislike.cognitoUserName)
        }
      }
      const matchedUsers = matches.map((match) => match.cognitoUserName);
      const exceptUsers = {
        exceptUsers: [...[user.cognitoUserName], ...matchedUsers, ...likedUsers, ...dislikedUsers],
      };
      const city = { lat: user.cityLat, lng: user.cityLng };
      search.search({ ...searchParams, ...exceptUsers }, city, nextToken).then((res: any) => {
        userSubscribes.forEach(subscribe => {
          subscribe.unsubscribe();
        });
        if (pressedButton) {
          if (typeof ResultScreen.loveButtonHandlers[pressedButton] === 'function') {
            ResultScreen.loveButtonHandlers[pressedButton]
          }
        }
        const { items, nextToken: apiNextToken, total } = res.data.searchUsers;
        console.log(total);
        setNextToken(apiNextToken);
        setResultPersons(items.sort(() => Math.random() - 0.5));
        if (items.length !== 0) {
          if (resultPersonIndex > resultPersons.length - 1) {
            setResultPersonIndex(0);
          }
          setCurrentResultPerson(0, items);
          if (total > 0) {
            setIsResultEnd(false);
          }
        } else if (items.length === 0 && nextToken !== '') {
          if (total > 0) {
            setIsResultEnd(true);
          }
          setNextToken('');
          setReSearch((prev) => !prev);
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
        subscriptionRemoveMatch(match, removeFromGlobalStateMatch);
      });
      subscriptionMyFutureMatches(user.cognitoUserName, addNewMatch);
    }
  }, [searchParams, pressedButton, matchNumberChanged, reSearch]);

  const changeGlobalStateMatch = (match) => {
    const { index, routes } = navigation.dangerouslyGetState();
    const screenName = routes[index].name;
    const newMatches = matches.map((m) => {
      if (m.id === match.id) {
        return match;
      }
      return m;
    });
    dispatch(setMatches(newMatches));
    if (screenName !== 'Chat'
      && match.lastNewMessageSender
      && (match.lastNewMessageSender !== user.cognitoUserName)) {
      dispatch(setHasNotification(true));
    }
  };

  const removeFromGlobalStateMatch = (matchId) => {
    const newMatches = matches.filter((m) => m.id !== matchId);
    dispatch(setMatches(newMatches));
  };

  const addNewMatch = (matchData) => {
    setIsMatchModalActive(true);
    dispatch(addMatch(matchData));
  };

  const updateResultPerson = (rawPerson, items) => {
    const newResultPersons = items
      .filter((person) => person.cognitoUserName === rawPerson.cognitoUserName)
      .map((person) => updatePersonAttributes(person, rawPerson));
    setUpdatedPersons([...updatedPersons, ...newResultPersons]);
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
    let resultFromAPI = persons ? persons[personIndex] : resultPersons[personIndex];
    const temp = updatedPersons.filter((updatedPerson) => updatedPerson.cognitoUserName === resultFromAPI.cognitoUserName);
    if (temp.length > 0) {
      resultFromAPI = temp[temp.length - 1];
    }
    const resultWithValidValues = {};
    if (resultFromAPI) {
      Object.keys(resultFromAPI).forEach((key) => {
        if (resultFromAPI[key]) {
          resultWithValidValues[key] = resultFromAPI[key];
        }
      });
      setResultPerson({ ...initialResultPerson, ...resultWithValidValues });
      setEmotionsWithTheResultPerson(connectedEmotions(resultWithValidValues.cognitoUserName));
      if (user.likes
        && user.likes.find((like) => like.cognitoUserName === resultWithValidValues.cognitoUserName)
        && resultWithValidValues.likes
        && Array.isArray(resultWithValidValues.likes)
        && resultWithValidValues.likes.find((obj) => obj.cognitoUserName === user.cognitoUserName
        && !(matches.find((match) => match.cognitoUserName === resultWithValidValues.cognitoUserName))
        )) {
        setTimeout(() => {
          newMatchHandler(resultWithValidValues);
        }, 0);
      }
    }
  };

  const handlePressNext = () => {
    let index = resultPersonIndex;
    if (resultPersonIndex < resultPersons.length - 1) {
      setResultPersonIndex((prev) => prev + 1);
      index = resultPersonIndex + 1;
    } else {
      setReSearch((prev) => !prev);
      //setResultPersonIndex(0);
      //index = 0;
    }
    if (resultPersons.length > 0) {
      setCurrentResultPerson(index);
    }
  };

  const handlePressLike = () => {
    if (resultPerson.cognitoUserName) {
      const newUser = { ...user };
      newUser.likes = createEmotionObject(newUser.likes, resultPerson.cognitoUserName);
      dispatch(setUser({ user: newUser }));
      if (checkMatch()) {
        newMatchHandler();
      }
    }
    handlePressNext();
  };

  const handlePressDislike = () => {
    if (resultPerson.cognitoUserName) {
      const newUser = { ...user };
      newUser.dislikes = createEmotionObject(newUser.dislikes, resultPerson.cognitoUserName);
      dispatch(setUser({ user: newUser }));
    }
    handlePressNext();
  };

  ResultScreen.loveButtonHandlers = {
    handlePressDislike,
    handlePressLike,
    handlePressNext,
  };

  const createEmotionObject = (array, userId) => {
    const resultArray = array ? [...array] : [];
    if (!resultArray.find((obj) => obj.cognitoUserName === userId)) {
      resultArray.push({ cognitoUserName: userId, timestamp: new Date() });
    }
    return resultArray;
  };

  const checkMatch = () => {
    return resultPerson.likes && Array.isArray(resultPerson.likes) && resultPerson.likes.find((obj) => obj.cognitoUserName === user.cognitoUserName);
  };

  const newMatchHandler = (person?) => {
    const matchedPerson = person || resultPerson;
    setIsMatchModalActive(true);
    dispatch(setHasNotification(true));
    const id = uuidv4();
    const matchData: matchType = {
      id,
      cognitoUserName: matchedPerson.cognitoUserName,
      name: matchedPerson.userName,
      avatar_url: matchedPerson.images[matchedPerson.primaryImageIndex],
      subtitle: new Date().toISOString().split('T', 1).join(''),
      lastNewMessageSender: 'new',
    };
    dispatch(addMatch(matchData));
    chat.createNewChat({
      user1: user.cognitoUserName,
      user2: matchedPerson.cognitoUserName,
      messages: [],
    });
    saveNewMatch({
      id,
      user1: user.cognitoUserName,
      user2: matchedPerson.cognitoUserName,
      timestamp: new Date(),
      lastNewMessageSender: 'new',
    });
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
        if (isExist) {
          result.push(emotionName);
        }
      }
    });
    return result;
  };

  const handlePressConectedEmotions = (emotionArrayName) => {
    const newUser = { ...user };
    if (newUser[emotionArrayName]) {
      const newEmotions = newUser[emotionArrayName].filter(
        (emotion) => emotion.cognitoUserName !== resultPerson.cognitoUserName,
      );
      newUser[emotionArrayName] = newEmotions;
      dispatch(setUser({ user: newUser }));
      setEmotionsWithTheResultPerson([]);
    }
  };

  const isHasResult = () => {
    return (resultPerson.age > -1 && resultPerson.userName !== '') && user.cityName !== null;
  };

  const userHasFilledProfie = () => {
    return !!user.cityName;
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.userContainer}>
        <View>
          <Modal
            iconName="spinner"
            isVisible={isLoaderActive || isResultEnd}
            description={localizations.t('load')}
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
              description={localizations.t('congratsDate')}
              buttonSecondaryText={localizations.t('close')}
              iconName="heart"
              iconColor={colors.primary}
              handlePressButtonSecondary={() => { setIsMatchModalActive(false); }}
            />
            {isResultEnd ?
              <Card containerStyle={styles.noResultBox}>
                <Icon
                  name="search"
                  size={60}
                  color={colors.grey}
                  type="font-awesome"
                />
              </Card>
              :
              isHasResult() ?
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
                <Text style={styles.title}>
                  {
                    userHasFilledProfie()
                      ? localizations.t('noDate')
                      : localizations.t('noProfileSave')
                  }
                </Text>
                <Button
                  buttonStyle={styleForm.btnPrimary}
                  titleStyle={{ fontSize: fonts.heading2 }}
                  title={
                    userHasFilledProfie()
                      ? localizations.t('backToSearch')
                      : localizations.t('backToProfile')
                  }
                  onPress={() => {
                    dispatch(setActiveMenuId(3));
                    userHasFilledProfie()
                      ? navigation.navigate('Settings', { newUser: false })
                      : navigation.navigate('Settings', { newUser: true });
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
