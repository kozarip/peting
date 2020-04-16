import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import PetingHeader from '../components/petingHeader';
import UserData from '../components/userData';
import AppSettings from '../components/appSettings';


const searchRoute = () => (
  // @ts-ignore
  <UserData isWithRange={true} isFullForm={false} />
);

const profileRoute = () => (
  // @ts-ignore
  <UserData isWithRange={false} isFullForm={true} />
);

const appSettingsRoute = () => (
  <AppSettings />
);


const initialLayout = { width: Dimensions.get('window').width };

const SettingsScreen = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'search', title: 'Keresés' },
    { key: 'profile', title: 'Profilom' },
    { key: 'appSettings', title: 'Beállítások' },
  ]);

  const renderScene = SceneMap({
    search: searchRoute,
    profile: profileRoute,
    appSettings: appSettingsRoute,
  });

  const image = require('../assets/images/pet_silhouettes2.jpg');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        style={{ width: '100%', flex: 1 }}
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
    fontSize: 22,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },
});

export default SettingsScreen;