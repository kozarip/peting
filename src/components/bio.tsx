import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { fonts, colors, margins } from '../assets/styles/variables';
import { styleBox } from '../assets/styles/base';

type BioProps = {
  bio: string
}

const Bio: React.FC<BioProps> = ({ bio }) => {
  return (
    <View style={styleBox}>
      <Text style={styles.bio}>{bio}</Text>
    </View>

  );
};

const styles = StyleSheet.create({
  bio: {
    fontSize: fonts.default,
    borderTopColor: colors.separator,
    borderTopWidth: 1,
    paddingVertical: margins.sm,
  },
});

export default Bio;
