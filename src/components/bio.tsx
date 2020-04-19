import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Bio = ({ bio }) => {
  return (
    <View style={styles.bioBox}>
      <Text style={styles.bio}>{bio}</Text>
    </View>

  );
};

const styles = StyleSheet.create({
  bioBox: {
    display: 'flex',
    marginTop: 10,
  },
  bio: {
    fontSize: 15,
  },
});

export default Bio;
