import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { styleContainer } from '../assets/styles/base';
import { fonts } from '../assets/styles/variables';

type ProfileTitleProps = {
  name: string,
  age?: number,
  city?: string
  smallFont?: boolean
}

const ProfileTitle: React.FC<ProfileTitleProps> = ({ name, age, city, smallFont = false }) => {
  const cssClassName = smallFont ? { ...styles.title, ...styles.smallTitle } : styles.title;
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={cssClassName}>
          {name}
          {age && age > 0 && ', '}
        </Text>
        {age && age > 0 && <Text style={cssClassName}>{age}</Text>}
      </View>
      {city && <Text style={styles.cityName}>{city}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    ...styleContainer as any,
  },
  title: {
    fontSize: fonts.heading1,
  },
  smallTitle: {
    fontSize: fonts.heading2,
  },
  cityName: {
    display: 'flex',
    fontSize: fonts.default,
  },
});

export default ProfileTitle;
