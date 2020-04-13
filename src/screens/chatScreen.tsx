import React from 'react';
import { Text, View } from 'react-native';
import PetingHeader from '../components/petingHeader';

const ChatScreen = ({ route, navigation }) => {
  const { name } = route.name;

  return (
    <View>
      <PetingHeader
        navigation={navigation}
      />
      <Text>
        You can chat with:
        {name}
      </Text>
    </View>
  );
};


export default ChatScreen;
