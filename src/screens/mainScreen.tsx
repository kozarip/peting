import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const MainScreen = () => {
  return (
    <View style={styles.component}>
      <Text>This is the main screen, Yeah</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
})

export default MainScreen;