import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Search from '../services/search';
import Chat from '../services/chat';
import { saveNewMatch, subscriptionMatch } from '../services/match';
import PetingHeader from '../components/petingHeader';
import LoveButtons from '../components/loveButtons';
import { styleBackground, styleContainer } from '../assets/styles/base';
import { margins, dimensions, colors, fonts } from '../assets/styles/variables';
import PersonCard from '../components/personCard';
import { setUser, setMatches, setActiveMenuId } from '../store/action';
import HeaderTriangle from '../components/headerTriangle';
import Modal from '../components/modal';
import { Card, Icon, Button } from 'react-native-elements';
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
      if (res.data.searchUsers.items.length !== 0) {
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
      setIsMatchModalActive(true);

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

  const connectedEmotions = () => {
    const like = Boolean(user.likes.find(
      (likeObj) => likeObj.cognitoUserName === resultPerson.cognitoUserName,
    ));
    const dislike = Boolean(user.dislikes.find(
      (likeObj) => likeObj.cognitoUserName === resultPerson.cognitoUserName,
    ));
    return {
      like,
      dislike,
    };
  };

  const isHasResult = () => {
    return resultPerson.age > -1 && resultPerson.userName !== '';
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.userContainer}>
        <PetingHeader
          navigation={navigation}
        />
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
            <HeaderTriangle />
            <Modal
              isVisible={isMatchModalActive}
              title="Match!"
              description="Gratulálunk, jó randit!"
              buttonSecondaryText="Bezárás"
              iconName="heart"
              iconColor={colors.primary}
              handlePressButtonSecondary={() => { setIsMatchModalActive(false); }}
            />
            { isHasResult() ?
              <PersonCard
                person={resultPerson}
                navigation={navigation}
                connectedEmotions={connectedEmotions()}
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
