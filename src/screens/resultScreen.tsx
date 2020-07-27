import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Search from '../services/search';
import Chat from '../services/chat';
import { saveNewMatch, subscriptionMatch } from '../services/match';
import PetingHeader from '../components/petingHeader';
import LoveButtons from '../components/loveButtons';
import { styleBackground, styleContainer } from '../assets/styles/base';
import { margins } from '../assets/styles/variables';
import { hairColor, smokeFrequency, hobbies } from '../constants/userFields';
import PersonCard from '../components/personCard';
import Loader from '../components/loader';
import EmptyResultModal from '../components/emptyResultModal';
import { setUser, setMatches } from '../store/action';

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
  images: [require('../assets/images/elsa.jpg')],
  animalImages: [require('../assets/images/dog_sample.jpg')],
};

const ResultScreen: React.FC<ResultScreenProps> = ({ navigation, route }) => {
  const image = require('../assets/images/pet_silhouettes2.jpg');
  const pressedButton = route.params ? route.params.pressedButton : '';

  const { searchParams, user, matches } = useSelector((state: any) => state);

  const [resultPersons, setResultPersons] = useState([]);
  const [resultPersonIndex, setResultPersonIndex] = useState(0);
  const [resultPerson, setResultPerson] = useState(initialResultPerson);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);

  const search = new Search();
  const chat = new Chat();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoaderActive(true);
    setResultPerson(initialResultPerson);
    setResultPersonIndex(0);
    const matchedUsers = matches.map((match) => match.cognitoUserName);
    const exceptUsers = { exceptUsers: [...[user.cognitoUserName], ...matchedUsers] };
    const city = { lat: user.cityLat, lng: user.cityLng };
    search.search({ ...searchParams, ...exceptUsers }, city).then((res: any) => {
      if (pressedButton) {
        if (typeof ResultScreen.loveButtonHandlers[pressedButton] === 'function') {
          ResultScreen.loveButtonHandlers[pressedButton]
        }
      }
      setResultPersons(res.data.searchUsers.items);
      if (res.data.searchUsers.items.length === 0) {
        setIsOverlayActive(true);
      } else {
        if (resultPersonIndex > resultPersons.length - 1) {
          setResultPersonIndex(0);
        }
        setCurrentResultPerson(resultPersonIndex, res.data.searchUsers.items);
      }
      setIsLoaderActive(false);
    });
    matches.forEach((match) => {
      subscriptionMatch(match, setMatchToGlobalState);
    });
  }, [searchParams, pressedButton]);

  const setMatchToGlobalState = (match) => {
    dispatch(setMatches({ matches: match }));
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
      if (resultWithValidValues.hobbies) resultWithValidValues.hobbies = getDetailText(resultWithValidValues.hobbies, 'hobbies');
      if (resultWithValidValues.smokeFrequency) resultWithValidValues.smokeFrequency = getDetailText(resultWithValidValues.smokeFrequency, 'smokeFrequency');
      if (resultWithValidValues.hairColor) resultWithValidValues.hairColor = getDetailText(resultWithValidValues.hairColor, 'hairColor');
      setResultPerson({ ...initialResultPerson, ...resultWithValidValues });
    }
  };

  const handlePressNext = () => {
    // console.log(resultPersonIndex, resultPersons.length);
    if (resultPersonIndex < resultPersons.length - 1) {
      setResultPersonIndex(resultPersonIndex + 1);
    } else {
      setResultPersonIndex(0);
    }
    setCurrentResultPerson(resultPersonIndex);
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
      Alert.alert('Match! Gratulálok');

      const matchData: matchType = {
        id: Math.random(),
        cognitoUserName: resultPerson.cognitoUserName,
        name: resultPerson.userName,
        avatar_url: resultPerson.images[resultPerson.primaryImageIndex],
        subtitle: new Date().toISOString().split('T', 1).join(''),
      };
      dispatch(setMatches({ matches: [matchData] }));
      chat.createNewChat({
        user1: user.cognitoUserName,
        user2: resultPerson.cognitoUserName,
        messages: [],
      });
      saveNewMatch({
        user1: user.cognitoUserName,
        user2: resultPerson.cognitoUserName,
        timestamp: new Date(),
      });
    }
  };

  const getDetailText = (value, type) => {
    let itemObject;
    switch (type) {
      case 'hobbies':
        itemObject = hobbies.filter((hobby) => value.includes(hobby.id));
        // eslint-disable-next-line no-case-declarations
        const onlyNames = itemObject.map((hobby) => hobby.name);
        return onlyNames.join(', ');
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
            <EmptyResultModal
              setIsOverlayActive={setIsOverlayActive}
              isOverlayActive={isOverlayActive}
              navigation={navigation}
            />
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
