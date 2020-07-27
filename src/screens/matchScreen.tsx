import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Button,
} from 'react-native';
import { ListItem, Card, Overlay, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import User from '../services/user';
import ImageStore from '../services/imageStore';
import PersonCard from '../components/personCard';
import PetingHeader from '../components/petingHeader';
import { margins, colors } from '../assets/styles/variables';
import { styleTitle, styleBackground } from '../assets/styles/base';

type MatchScreenProps = {
  navigation: any
}

const MatchScreen: React.FC<MatchScreenProps> = ({ navigation }) => {
  const { matches, user } = useSelector((state) => state);
  const [myMatches, setMyMatches] = useState<matchType[]>([]);
  const [matchImages, setMatchImages] = useState({});
  const [friendObject, setFriendObject] = useState({});
  const [isCardActive, setIsCardActive] = useState(false);

  const imageStore = new ImageStore('Unknown');
  const friendUser = new User();

  useEffect(() => {
    setMyMatches(orderMatches(matches));
    const images: string[] = [];
    myMatches.forEach((match: matchType) => {
      if (match.avatar_url && !match.avatar_url.startsWith('https://')) {
        images.push(match.avatar_url);
      }
    });
    setCompiledImages(images);
  });

  const setCompiledImages = async (imageIds) => {
    const imageURLs = await imageStore.fetchImages(imageIds);
    Promise.all(imageURLs).then((compiledImages: string[]) => {
      compiledImages.forEach((image, i) => {
        if (myMatches.length > 0) {
          const temp = {};
          temp[i] = image;
          setMatchImages({ ...matchImages, ...temp });
          myMatches[i].avatar_url = image;
          setMyMatches(myMatches);
        }
      });
    });
  };

  const orderMatches = (unOrderedMatches: []) => {
    return unOrderedMatches
      .sort((a, b) => orderByDate(a, b))
      .sort((a, b) => orderByNewMessages(a, b));
  };

  const orderByNewMessages = (a, b) => {
    if (a.lastNewMessageSender !== '' && b.lastNewMessageSender === '') {
      return 1;
    } else if (b.lastNewMessageSender !== '' && a.lastNewMessageSender === '') {
      return -1;
    }
    return 0;
  };

  const orderByDate = (a, b) => {
    if (a.timestamp > b.timestamp) {
      return -1;
    } else if (a.timestamp < b.timestamp) {
      return 1;
    }
    return 0;
  };

  const handlePressAvatar = (cognitoUserName) => {
    friendUser.getUserByCognitoUserName(cognitoUserName).then((dataFromApi) => {
      setFriendObject(dataFromApi.data.userByCognitoUserName.items[0]);
      console.log(friendObject);
      setIsCardActive(true);
    });
  };

  const image = require('../assets/images/pet_silhouettes2.jpg');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        style={styleBackground}
        resizeMode="repeat"
        imageStyle={{ opacity: 0.04 }}
      >
        <PetingHeader
          navigation={navigation}
        />
        <Text style={styles.title}>Matchek</Text>
        <Overlay
          isVisible={isCardActive}
          width="100%"
          height="90%"
        >
          <View>
            <ScrollView>
              <PersonCard
                navigation={navigation}
                person={friendObject}
              />
            </ScrollView>
            <Button
              color={colors.darkPrimary}
              title="Bezárás"
              onPress={() => setIsCardActive(false)}
            />
          </View>
        </Overlay>
        {
          // eslint-disable-next-line operator-linebreak
          myMatches.length > 0 ?
            <ScrollView>
              {
                myMatches.map((item, i) => (
                  <ListItem
                    key={i}
                    title={item.name.trim()}
                    subtitle={item.subtitle}
                    leftAvatar={{ source: { uri: matchImages[i] } }}
                    rightIcon={
                      item.lastNewMessageSender === item.cognitoUserName ?
                        <Icon
                          name="envelope"
                          size={15}
                          raised
                          color={colors.primary}
                          type="font-awesome"
                        />
                        : <></>
                    }
                    bottomDivider
                    chevron
                    onPress={() => {
                      navigation.navigate('Chat', {
                        id: item.id,
                        name: item.name,
                        userId: user.cognitoUserName,
                        friendId: item.cognitoUserName,
                        avatar: matchImages[i],
                        timestamp: item.subtitle,
                        lastNewMessageSender: item.lastNewMessageSender,
                      });
                    }}
                    onLongPress={() => handlePressAvatar(item.cognitoUserName)}
                  />
                ))
              }
            </ScrollView>
            : <Card><Text>Sajnos még nincs egyezésed</Text></Card>
        }
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  title: {
    ...styleTitle as any,
    paddingHorizontal: margins.sm,
    marginTop: margins.md,
  },
});

export default MatchScreen;
