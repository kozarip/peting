import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../assets/styles/variables';

type LoveButtonsProps = {
  handlePressLike: any,
  handlePressDislike: any,
  handlePressNext: any
}

const LoveButtons: React.FC<LoveButtonsProps> = (
  { handlePressLike, handlePressDislike, handlePressNext },
) => {
  const iconSize = 27;
  return (
    <View style={styles.reviewBox}>
      <TouchableOpacity
        onPress={handlePressDislike}
      >
        <Icon
          name="times-circle"
          size={iconSize}
          color="#40D18A"
          type="font-awesome"
          raised
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePressLike}
      >
        <Icon
          name="heart"
          size={iconSize}
          color="#ED2654"
          type="font-awesome"
          raised
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePressNext}
      >
        <Icon
          name="chevron-circle-right"
          size={iconSize}
          color="#3692DD"
          type="font-awesome"
          raised
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewBox: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.separator,
  },
});

export default LoveButtons;
