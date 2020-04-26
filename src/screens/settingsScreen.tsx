import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PetingHeader from '../components/petingHeader';
import UserData from '../components/userData';
import AppSettings from '../components/appSettings';
import { styleTitle, styleBackground } from '../assets/styles/base';
import { margins, fonts } from '../assets/styles/variables';


const searchRoute = () => (
  // @ts-ignore
  <UserData isFullForm={false} isWithRange />
);

const profileRoute = () => (
  // @ts-ignore
  <UserData isFullForm isWithRange={false} />
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
              labelStyle={{fontSize: 15}}
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
