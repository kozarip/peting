import React from 'react';
import { Text, View } from 'react-native';
import PetingHeader from '../components/petingHeader';

const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <PetingHeader
        navigation={navigation}
      />
      <Text>This is your profile</Text>
    </View>
  );
};

export default ProfileScreen;
