import React from 'react';
import { Header } from 'react-native-elements';
import { colors } from '../assets/styles/variables';


type PetingHeaderProps = {
  navigation: any,
}

const PetingHeader: React.FC<PetingHeaderProps> = ({ navigation }) => {
  return (
    <Header
      containerStyle={{
        paddingTop: 0,
        height: 60,
        borderBottomColor:
          colors.separator,
        borderBottomWidth: 1,
      }}
      backgroundColor={colors.primary}
      leftComponent={{
        icon: 'search', color: '#fff', size: 32, onPress: () => navigation.navigate('Result'),
      }}
      centerComponent={{
        icon: 'favorite', color: '#fff', size: 32, onPress: () => navigation.navigate('Match'),
      }}
      rightComponent={{
        icon: 'settings', color: '#fff', size: 32, onPress: () => navigation.navigate('Settings'),
      }}
    />
  );
};

export default PetingHeader;
