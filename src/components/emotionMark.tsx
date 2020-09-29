import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../assets/styles/variables';
import Modal from './modal';

type emotionMarkProps = {
  type: 'dislikes' | 'likes',
  handlePressConectedEmotions: any,
}

const EmotionMark: React.FC<emotionMarkProps> = ({ type, handlePressConectedEmotions }) => {

  const [isActiveRemoveEmotionModal, setIsActiveRemoveEmotionModal] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => { setIsActiveRemoveEmotionModal(true); }}
      >
        <Icon
          containerStyle={styles.emotionMark}
          name="heart"
          size={20}
          color={type === 'dislikes' ? '#000' : colors.primary}
          type="font-awesome"
        />
      </TouchableOpacity>
      <Modal
        isVisible={isActiveRemoveEmotionModal}
        iconName="trash"
        description="Biztos törölni akarod a jelölést?"
        buttonPrimaryText="Igen"
        buttonSecondaryText="Nem"
        handlePressButtonPrimary={() => {
          handlePressConectedEmotions(type);
          setIsActiveRemoveEmotionModal(false);
        }}
        handlePressButtonSecondary={() => { setIsActiveRemoveEmotionModal(false); }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emotionMark: {
    marginLeft: 10,
    marginTop: 15,
  },
});

export default EmotionMark;
