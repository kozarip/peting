import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

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
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 28,
    marginRight: 10,
  },
  smallTitle: {
    fontSize: 19,
  },
});

export default ProfileTitle;
