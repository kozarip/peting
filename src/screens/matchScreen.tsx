import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Button,
} from 'react-native';
import { ListItem, Card, Overlay, Icon, Tooltip, Avatar } from 'react-native-elements';
// import Tooltip from "rne-modal-tooltip";
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import User from '../services/user';
import ImageStore from '../services/imageStore';
import PersonCard from '../components/personCard';
import PetingHeader from '../components/petingHeader';
import { margins, colors, dimensions, fonts } from '../assets/styles/variables';
import { styleTitle, styleBackground, styleContainer } from '../assets/styles/base';
import HeaderTriangle from '../components/headerTriangle';
import Modal from 'components/modal';

type MatchScreenProps = {
  navigation: any
}

const MatchScreen: React.FC<MatchScreenProps> = ({ navigation }) => {
  const { matches, user } = useSelector((state) => state);
  const [myMatches, setMyMatches] = useState<matchType[]>([]);
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
          myMatches[i].avatar_url = image;
          setTimeout(() => {
            setMyMatches((previsous) => [...previsous, ...[myMatches[i]]]);
          }, 0);
        }
      });
    });
  };

  const orderMatches = (unOrderedMatches: []) => {
    return unOrderedMatches
      .sort((a, b) => orderByNewMessages(a, b))
      .sort((a, b) => orderByDate(a, b));
  };

  const orderByNewMessages = (a, b) => {
    if (a.lastNewMessageSender !== '' && b.lastNewMessageSender === '') {
      return -1;
    } else if (b.lastNewMessageSender !== '' && a.lastNewMessageSender === '') {
      return 1;
    }
    return 0;
  };

  const orderByDate = (a, b) => {
    if (a.subtitle > b.subtitle) {
      return -1;
    } else if (a.subtitle < b.subtitle) {
      return 1;
    }
    return 0;
  };

  const handlePressAvatar = async (cognitoUserName) => {
    const dataFromApi = await friendUser.getUserByCognitoUserName(cognitoUserName);
    setFriendObject(dataFromApi.data.userByCognitoUserName.items[0]);
    setIsCardActive(true);
  };

  const image = require('../assets/images/background.png');

  return (
    <View style={styles.container}>
      <PetingHeader
        navigation={navigation}
      />
      <ImageBackground
        source={image}
        style={styleBackground}
        resizeMode="repeat"
        imageStyle={{ opacity: 0.3 }}
      >
        <HeaderTriangle />
        <View style={styles.screenHeader}>
          <Text style={styles.title}>Matchek</Text>
          <Tooltip
            backgroundColor={colors.primary}
            height={80}
            width={dimensions.fullWidth * 0.8}
            popover={
              <Text style={styles.infoText}>
                Az avatar képre kattintva, elő tudod hozni a személy profilját
              </Text>
            }
          >
            <Icon
              name="info"
              size={12}
              raised
              color={colors.primary}
              type="font-awesome"
            />
          </Tooltip>
        </View>
        <Overlay
          isVisible={isCardActive}
          height="90%"
          overlayStyle={{ padding: 0,}}
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
                orderMatches(myMatches).map((item, i) => (
                  <ListItem
                    key={i}
                    containerStyle={styles.listItem}
                  >
                    <Avatar
                      rounded
                      size="large"
                      onPress={() => handlePressAvatar(item.cognitoUserName)}
                      source={{ uri: item.avatar_url }}
                    />
                    <ListItem.Content>
                      <ListItem.Title style={{color: colors.grey, fontSize: fonts.heading3, minWidth: 150}}>{item.name.trim()}</ListItem.Title>
                      <ListItem.Subtitle style={{color: colors.separator}}>{item.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                    {
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
                    <ListItem.Chevron
                      size={40}
                      color={colors.separator}
                      onPress={() => {
                        navigation.navigate('Chat', {
                          id: item.id,
                          name: item.name,
                          userId: user.cognitoUserName,
                          friendId: item.cognitoUserName,
                          avatar: item.avatar_url,
                          timestamp: item.subtitle,
                          lastNewMessageSender: item.lastNewMessageSender,
                        });
                      }}
                    />
                  </ListItem>
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
    marginTop: margins.sm,
    fontWeight: 'bold',
  },
  listItem: {
    marginBottom: margins.md,
    marginHorizontal: margins.md,
    borderRadius: 20,
    marginTop: margins.sm,
  },
  screenHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
  },
});

export default MatchScreen;
