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

import Profile from '../components/profile';
import AppSettings from '../components/appSettings';
import SearchComponent from '../components/search';
import NewUserAlert from '../components/newUserAlert';
import Loader from '../components/loader';

import { styleTitle, styleBackground } from '../assets/styles/base';
import { margins } from '../assets/styles/variables';
import { setUser } from '../store/action';
import User from '../services/user';

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
    dispatch(setUser({user: modifiedUser}));
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

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'search', title: 'Keresés' },
    { key: 'profile', title: 'Profilom' },
    { key: 'appSettings', title: 'Beállítás' },
  ]);

  const renderScene = SceneMap({
    search: searchRoute,
    profile: profileRoute,
    appSettings: appSettingsRoute,
  });

  const image = require('../assets/images/pet_silhouettes2.jpg');

  return (
    <View style={styles.container}>
      <Loader isActive={isLoaderActive} />
      <NewUserAlert
        isNewUser={isNewUser}
        setIsNewUser={setIsNewUser}
      />
      <ImageBackground
        source={image}
        style={styleBackground}
        resizeMode="repeat"
        imageStyle={{ opacity: 0.04 }}
      >
        <PetingHeader
          navigation={navigation}
        />
        <Text style={styles.title}>Beállítások</Text>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          swipeEnabled={false}
          renderTabBar={(props) => (
            <TabBar
              inactiveColor="#000"
              pressColor="#000"
              labelStyle={{ fontSize: 15 }}
              activeColor="#000"
              {...props}
              style={{ backgroundColor: '#fff' }}
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
});

export default SettingsScreen;
