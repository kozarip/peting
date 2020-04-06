import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Welcome = () => {
  return (
    <View>
      <Text style={styles.title}>Peting</Text>
      <Text style={styles.motto}>Az állatbarátok társkeresője</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 64,
    marginBottom: 20,
  },
  motto: {
    textAlign: 'center',
    fontSize: 34,
    marginBottom: 50,
  },
});

export default Welcome;
