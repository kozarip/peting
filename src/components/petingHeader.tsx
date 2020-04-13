import React from 'react';
import { Header } from 'react-native-elements';

const PetingHeader = ({ navigation }) => {
  return (
    <Header
      containerStyle={{ paddingTop: 0, height: 60 }}
      backgroundColor="#1a1a1a"
      leftComponent={{
        icon: 'favorite', color: '#fff', size: 32, onPress: () => navigation.navigate('Result'),
      }}
      centerComponent={{
        icon: 'comment', color: '#fff', size: 32, onPress: () => navigation.navigate('Match'),
      }}
      rightComponent={{
        icon: 'settings', color: '#fff', size: 32, onPress: () => navigation.navigate('Settings'),
      }}
    />
  );
};

export default PetingHeader;
