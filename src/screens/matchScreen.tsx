import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import ImageStore from '../services/imageStore';
import PetingHeader from '../components/petingHeader';
import { margins } from '../assets/styles/variables';
import { styleTitle, styleBackground } from '../assets/styles/base';

const MatchScreen = ({ navigation }) => {
  const [myMatches, setMyMatches] = useState<matchType[]>([]);
  const [matchImages, setMatchImages] = useState({});

  const { matches, user } = useSelector((state) => state);
  const imageStore = new ImageStore('Unknown');

  useEffect(() => {
    setMyMatches(matches);
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
                    bottomDivider
                    chevron
                    onPress={() => {
                      navigation.navigate('Chat', {
                        id: i,
                        name: item.name,
                        userId: user.cognitoUserName,
                        friendId: item.cognitoUserName,
                        avatar: matchImages[i],
                      });
                    }}
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
