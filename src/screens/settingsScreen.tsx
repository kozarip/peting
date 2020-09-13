import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PetingHeader from '../components/petingHeader';
import HeaderTriangle from '../components/headerTriangle';

import Profile from '../components/profile';
import AppSettings from '../components/appSettings';
import SearchComponent from '../components/search';

import { styleTitle, styleBackground } from '../assets/styles/base';
import { margins, colors, fonts } from '../assets/styles/variables';
import { setUser } from '../store/action';
import User from '../services/user';
import Modal from '../components/modal';

const SettingsScreen = ({ navigation, route }) => {
  const [userAttributes, setUserAttributes] = useState({});
  const [isNewUser, setIsNewUser] = useState(route.params.newUser || false);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const loggedInUser = new User();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoaderActive(true);
    loggedInUser.init().then(() => {
      setIsLoaderActive(false);
      setUserAttributes(
        loggedInUser.getCurrentUserAttributes().data.userByCognitoUserName.items[0],
      );
    });
  }, []);

  const saveUser = (modifiedUser) => {
    dispatch(setUser({ user: modifiedUser }));
  };

  const searchRoute = () => (
    <SearchComponent
      userAttributes={userAttributes}
      saveUser={saveUser}
      setUserAttributes={setUserAttributes}
      navigation={navigation}
    />
  );
  const profileRoute = () => (
    <Profile
      userAttributes={userAttributes}
      saveUser={saveUser}
      setUserAttributes={setUserAttributes}
    />
  );
  const appSettingsRoute = () => (
    <AppSettings />
  );

  const initialLayout = { width: Dimensions.get('window').width };
  const defaultScreenNumber = isNewUser ? 1 : 0;

  const [index, setIndex] = React.useState(defaultScreenNumber);
  const [routes] = React.useState([
    { key: 'search', title: 'Keresés' },
    { key: 'profile', title: 'Profil' },
    { key: 'appSettings', title: 'Beállítás' },
  ]);

  const renderScene = SceneMap({
    search: searchRoute,
    profile: profileRoute,
    appSettings: appSettingsRoute,
  });

 /*  const renderLabel = ({ route }) => (
    <Text style={styles.tabTitle}>{route.title}</Text>
  ); */

  const image = require('../assets/images/background.png');

  return (
    <View style={styles.container}>
      <PetingHeader
        navigation={navigation}
      />
      <Modal
        iconName="spinner"
        isVisible={isLoaderActive}
        description="Adatok betöltése..."
      />
      <Modal
        iconName="heart"
        isVisible={isNewUser}
        title="Üdvözöllek"
        iconColor={colors.primary}
        description="Kérlek töltsd ki az adataidat"
        buttonPrimaryText="Rendben"
        handlePressButtonPrimary={() => { setIsNewUser(false); }}
      />
      <ImageBackground
        source={image}
        style={styleBackground}
        resizeMode="repeat"
        imageStyle={{ opacity: 0.3 }}
      >
        <HeaderTriangle />
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={(props) => (
            <TabBar
              indicatorStyle={{backgroundColor: colors.primary}}
              inactiveColor={colors.darkPrimary}
              pressColor={colors.grey}
              labelStyle={{ fontSize: 15 }}
              activeColor="#fff"
              {...props}
              style={styles.tabBar}
            />
          )}
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
  scene: {
    flex: 1,
  },
  title: {
    ...styleTitle as any,
    marginTop: margins.md,
  },
  tabBar: {
    backgroundColor: colors.primary,
    shadowOffset: { height: 0, width: 0 }, 
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  tabTitle: {
    fontSize: fonts.heading3,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
