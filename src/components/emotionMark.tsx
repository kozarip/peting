import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { localizations } from '../services/localizations';
import { colors } from '../assets/styles/variables';
import Modal from './modal';

type emotionMarkProps = {
  type: 'dislikes' | 'likes' | 'undesired',
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
          name={type === 'undesired' ? 'exclamation-circle' : 'heart'}
          size={type === 'undesired' ? 12 : 20}
          color={type === 'dislikes' || type === 'undesired' ? '#000' : colors.primary}
          type="font-awesome"
          raised={type === 'undesired'}
        />
      </TouchableOpacity>
      <Modal
        isVisible={isActiveRemoveEmotionModal}
        iconName="trash"
        description={type === 'undesired' ? localizations.t('undesired') : localizations.t('removeConfirmMark')}
        buttonPrimaryText={localizations.t('yes')}
        buttonSecondaryText={localizations.t('no')}
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
