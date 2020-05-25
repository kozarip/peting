import React from 'react';
import { Header, Icon } from 'react-native-elements';
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
      leftComponent={
        <Icon
          name="search"
          color="#ffffff"
          size={32}
          onPress={() => navigation.navigate('Result')}
          underlayColor={colors.primary}
        />
      }
      centerComponent={
        <Icon
          name="favorite"
          color="#ffffff"
          size={32}
          onPress={() => navigation.navigate('Match')}
          underlayColor={colors.primary}
        />
      }
      rightComponent={
        <Icon
          name="settings"
          color="#ffffff"
          size={32}
          onPress={() => navigation.navigate('Settings', { newUser: false })}
          underlayColor={colors.primary}
        />
      }
    />
  );
};

export default PetingHeader;
