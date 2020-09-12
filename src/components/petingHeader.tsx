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
        paddingTop: Platform.OS === 'ios' ? 12 : 0,
        height: 60,
        borderBottomWidth: 0,
      }}
      backgroundColor={colors.primary}
      leftComponent={
        <Icon
          name="sliders"
          color="#ffffff"
          size={25}
          onPress={() => navigation.navigate('Match')}
          underlayColor={colors.primary}
          type="font-awesome"
        />
      }
      centerComponent={
        <Icon
          name="heart"
          color="#ffffff"
          size={25}
          onPress={() => navigation.navigate('Result')}
          underlayColor={colors.primary}
          type="font-awesome"
        />
      }
      rightComponent={
        <Icon
          name="user"
          color="#ffffff"
          size={25}
          onPress={() => navigation.navigate('Settings', { newUser: false })}
          underlayColor={colors.primary}
          type="font-awesome"
        />
      }
    />
  );
};

export default PetingHeader;
