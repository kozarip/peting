import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import PetingHeader from '../components/petingHeader';
import { margins } from '../assets/styles/variables';
import { styleTitle, styleBackground } from '../assets/styles/base';

const MatchScreen = ({ navigation }) => {
  const list = [
    {
      id: 1,
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: '2020-03-24',
    },
    {
      id: 2,
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: '2020-03-10',
    },
  ];

  const keyExtractor = (item, index) => index.toString();

  const image = require('../assets/images/pet_silhouettes2.jpg');

  const renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={item.subtitle}
      leftAvatar={{ source: { uri: item.avatar_url } }}
      bottomDivider
      chevron
      onPress={() => { navigation.navigate('Chat', { id: item.id, name: item.name }); }}
    />
  );

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
        <FlatList
          keyExtractor={keyExtractor}
          data={list}
          renderItem={renderItem}
        />
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
