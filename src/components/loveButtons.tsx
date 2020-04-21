import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { styleContainer } from '../assets/styles/base';
import { margins } from '../assets/styles/variables';

const LoveButtons: React.FC = () => {
  return (
    <View style={styles.reviewBox}>
      <TouchableOpacity>
        <Icon
          name="times-circle"
          size={35}
          color="#000000"
          type="font-awesome"
          raised
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          name="heart"
          size={35}
          color="#FF0000"
          type="font-awesome"
          raised
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          name="chevron-circle-right"
          size={35}
          color="#008080"
          type="font-awesome"
          raised
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewBox: {
    ...styleContainer as any,
    justifyContent: 'space-around',
    marginTop: margins.sm,
  },
});

export default LoveButtons;
