import React from 'react';
import { Header, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../assets/styles/variables';
import { setActiveMenuId, setChatIds } from '../store/action';

type PetingHeaderProps = {
  navigation: any,
}

const PetingHeader: React.FC<PetingHeaderProps> = ({ navigation }) => {

  const { activeMenu } = useSelector((state) => state);
  const dispatch = useDispatch();

  const setMenuIdColor = (menuId) => (menuId === activeMenu ? '#fff' : colors.darkPrimary);

  const handleMenuSelect = (id, name) => {
    dispatch(setActiveMenuId(id));
    if (name === 'Settings') {
      navigation.navigate('Settings', { newUser: false })
    }
    navigation.navigate(name);
  };

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
          color={setMenuIdColor(1)}
          size={25}
          onPress={() => { handleMenuSelect(1, 'Match')}}
          underlayColor={colors.primary}
          type="font-awesome"
        />
      }
      centerComponent={
        <Icon
          name="heart"
          color={setMenuIdColor(2)}
          size={25}
          onPress={() => {handleMenuSelect(2, 'Result')}}
          underlayColor={colors.primary}
          type="font-awesome"
        />
      }
      rightComponent={
        <Icon
          name="user"
          color={setMenuIdColor(3)}
          size={25}
          onPress={() => { handleMenuSelect(3, 'Settings')}}
          underlayColor={colors.primary}
          type="font-awesome"
        />
      }
    />
  );
};

export default PetingHeader;
