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
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { deleteMatch, setUser, setMatches } from '../store/action';
import User from '../services/user';
import ImageStore from '../services/imageStore';
import { removeMatch, setGlobalMatches } from '../services/match';
import Modal from '../components/modal';
import PersonCard from '../components/personCard';
import PetingHeader from '../components/petingHeader';
import { margins, colors, dimensions, fonts } from '../assets/styles/variables';
import { styleTitle, styleBackground } from '../assets/styles/base';
import HeaderTriangle from '../components/headerTriangle';

type MatchScreenProps = {
  navigation: any
}

const MatchScreen: React.FC<MatchScreenProps> = ({ navigation }) => {
  const { matches, user } = useSelector((state) => state);
  const [myMatches, setMyMatches] = useState<matchType[]>([]);
  const [friendObject, setFriendObject] = useState({});
  const [isCardActive, setIsCardActive] = useState(false);
  const [isActiveRemoveMatchModal, setIsActiveRemoveMatchModal] = useState(false);
  const [removableMatchId, setRemovableMatchId] = useState('');
  const dispatch = useDispatch();
  const userClass = new User();

  const imageStore = new ImageStore('Unknown');
  const friendUser = new User();

  useEffect(() => {
    // setGlobalMatches(userClass, user.cognitoUserName, setMatchToGlobalState);
    setMyMatches([]);
    console.log(matches.length);
    const images: string[] = [];
    if (matches && matches.length > 0) {
      matches.forEach((match: matchType) => {
        if (match.avatar_url && !match.avatar_url.startsWith('https://')) {
          images.push(match.avatar_url);
        }
      });
      compileImages(images);
    }
  }, [matches]);
/*
  const setMatchToGlobalState = (match) => {
    dispatch(setMatches(match));
  };
 */
  const compileImages = async (imageIds) => {
    const imageURLs = await imageStore.fetchImages(imageIds);
    Promise.all(imageURLs).then((compiledImages: string[]) => {
      let compiledImageCounter = 0;
      if (matches.length > 0) {
        matches.forEach((match) => {
          if (match.avatar_url && !match.avatar_url.startsWith('https://')) {
            match.avatar_url = compiledImages[compiledImageCounter];
            compiledImageCounter++;
          }
          setMyMatches((previsous) => [...previsous, ...[match]]);
        });
      }
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

  const handleRemoveMatch = () => {
    removeMatch(removableMatchId);
    const removableMatch = myMatches.filter(
      (myMatch) => myMatch.id === removableMatchId,
    );
    dispatch(deleteMatch(removableMatch[0]));
    removeUserLike(removableMatch[0].cognitoUserName);
    setRemovableMatchId('');
    setIsActiveRemoveMatchModal(false);
  };

  const removeUserLike = (removableCongnitoUserName) => {
    const newLikes = user.likes.filter(
      (like) => like.cognitoUserName !== removableCongnitoUserName,
    );
    user.likes = newLikes;
    dispatch(setUser(user));
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
          {/* <Text>{myMatches.length}</Text> */}
          <Modal
            isVisible={isActiveRemoveMatchModal}
            iconName="trash"
            description="Biztos törölni akarod a matchet?"
            buttonPrimaryText="Igen"
            buttonSecondaryText="Nem"
            handlePressButtonPrimary={handleRemoveMatch}
            handlePressButtonSecondary={() => { setIsActiveRemoveMatchModal(false); }}
          />
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
          overlayStyle={styles.cardOverlay}
        >
          <View style={{flex: 1}}>
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
                      <ListItem.Title
                        style={
                          { color: colors.grey, fontSize: fonts.heading3, minWidth: 150 }
                        }
                      >
                        {item && item.name.trim()}
                      </ListItem.Title>
                      <ListItem.Subtitle style={styles.subtitle}>
                        {item.subtitle}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                    <View
                      style={{marginRight: -15}}
                    >
                      {
                        item.lastNewMessageSender === item.cognitoUserName ?
                          <Icon
                            name="envelope"
                            size={15}
                            raised
                            color={colors.grey}
                            type="font-awesome"
                          />
                          : <></>
                      }
                      <TouchableOpacity
                        onPress={() => {
                          setRemovableMatchId(item.id);
                          setIsActiveRemoveMatchModal(true);
                        }}
                      >
                        <Icon
                          name="trash"
                          size={15}
                          raised
                          color={colors.primary}
                          type="font-awesome"
                        />
                      </TouchableOpacity>
                    </View>
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
  subtitle: {
    color: colors.separator,
    fontSize: 13,
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
  cardOverlay: {
    width: dimensions.fullWidth,
    height: dimensions.fullHeight,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },
});

export default MatchScreen;
