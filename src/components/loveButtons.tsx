import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../assets/styles/variables';

type LoveButtonsProps = {
  handlePressLike: any,
  handlePressDislike: any,
  handlePressNext: any,
  isShowEmotionButtons?: boolean,
}

const LoveButtons: React.FC<LoveButtonsProps> = (
  { handlePressLike, handlePressDislike, handlePressNext, isShowEmotionButtons },
) => {
  const bigIconSize = 35;
  const smallIconSize = 30;
  return (
    <View style={styles.reviewBox}>
      {
        isShowEmotionButtons &&
        <TouchableOpacity
          onPress={handlePressDislike}
        >
          <Icon
            name="times"
            size={bigIconSize}
            color={colors.primary}
            type="font-awesome"
            raised
          />
        </TouchableOpacity>
      }
      <TouchableOpacity
        onPress={handlePressNext}
      >
        <Icon
          name="angle-double-up"
          size={smallIconSize}
          color={colors.separator}
          type="font-awesome"
          raised
        />
      </TouchableOpacity>
      {
        isShowEmotionButtons &&
        <TouchableOpacity
          onPress={handlePressLike}
        >
          <Icon
            name="heart"
            size={bigIconSize}
            color={colors.primary}
            type="font-awesome"
            reverse
          />
        </TouchableOpacity>
      }
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
    backgroundColor: '#00000000',
  },
});

export default LoveButtons;
