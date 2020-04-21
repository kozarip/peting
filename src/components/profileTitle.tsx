import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { styleContainer } from '../assets/styles/base';
import { fonts, margins } from '../assets/styles/variables';

type ProfileTitleProps = {
  name: string,
  age?: number,
  smallFont?: boolean
}

const ProfileTitle: React.FC<ProfileTitleProps> = ({ name, age, smallFont = false }) => {
  const cssClassName = smallFont ? { ...styles.title, ...styles.smallTitle } : styles.title;
  return (
    <View style={styles.titleContainer}>
      <Text style={cssClassName}>
        {name}
        {age && ','}
      </Text>
      {age && <Text style={cssClassName}>{age}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    ...styleContainer as any,
  },
  title: {
    fontSize: fonts.heading1,
    marginRight: margins.md,
  },
  smallTitle: {
    fontSize: fonts.heading2,
  },
});

export default ProfileTitle;
