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

  const iconSize = 28;

  return (
    <Header
      containerStyle={{
        paddingTop: Platform.OS === 'ios' ? 0 : 10,
        height: 70,
        borderBottomWidth: 0,
        marginTop: 20,
        paddingHorizontal: 5,
      }}
      backgroundColor={colors.primary}
      leftComponent={
        <Icon
          name="sliders"
          color={colors.primary}
          size={iconSize}
          onPress={() => { handleMenuSelect(1, 'Match')}}
          underlayColor={colors.primary}
          type="font-awesome"
          reverse
          reverseColor={setMenuIdColor(1)}
        />
      }
      centerComponent={
        <Icon
          name="heart"
          color={colors.primary}
          size={iconSize}
          onPress={() => {handleMenuSelect(2, 'Result')}}
          underlayColor={colors.primary}
          type="font-awesome"
          reverse
          reverseColor={setMenuIdColor(2)}
        />
      }
      rightComponent={
        <Icon
          name="user"
          color={colors.primary}
          size={iconSize}
          onPress={() => { handleMenuSelect(3, 'Settings')}}
          underlayColor={colors.primary}
          type="font-awesome"
          reverse
          reverseColor={setMenuIdColor(3)}
        />
      }
    />
  );
};

export default PetingHeader;
