import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Header, Icon as RNEIcon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../assets/styles/variables';
import { setActiveMenuId, setHasNotification } from '../store/action';

type PetingHeaderProps = {
  navigation: any,
}

const PetingHeader: React.FC<PetingHeaderProps> = ({ navigation }) => {

  const { activeMenu, hasNotification } = useSelector((state) => state);
  const dispatch = useDispatch();

  const setMenuIdColor = (menuId) => (menuId === activeMenu ? '#fff' : colors.darkPrimary);

  const handleMenuSelect = (id, name) => {
    dispatch(setActiveMenuId(id));
    if (name === 'Settings') {
      navigation.navigate('Settings', { newUser: false })
    }
    if (name === 'Match') {
      dispatch(setHasNotification(false));
    }
    navigation.navigate(name);
  };

  const iconSize = 28;

  return (
    <Header
      containerStyle={{
        paddingTop: 20,
        height: 80,
        borderBottomWidth: 0,
        marginTop: Platform.OS === 'ios' ? 0 : 10,
        paddingHorizontal: 5,
      }}
      backgroundColor={colors.primary}
      leftComponent={
        <View style={{ position: 'relative' }}>
          {hasNotification &&
            <Icon
              style={
                {
                  ...styles.hasNotificationIcon,
                  ...{ },
                }
              }
              name="plus-circle"
              size={15}
              color={activeMenu === 1 ? colors.darkPrimary : '#fff'}
            />
          }
          <RNEIcon
            name="heart"
            color={colors.primary}
            size={iconSize}
            onPress={() => { handleMenuSelect(1, 'Match')}}
            underlayColor={colors.primary}
            type="font-awesome"
            reverse
            reverseColor={setMenuIdColor(1)}
          />
        </View>
      }
      centerComponent={
        <RNEIcon
          name="sliders"
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
        <RNEIcon
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

const styles = StyleSheet.create({
  hasNotificationIcon: {
    position: 'absolute',
    top: 25,
    left: 26.5,
    zIndex: 9999,
    borderRadius: 100,
    borderWidth: 0,
    padding: 3,
    margin: 0,
  },
});

export default PetingHeader;
