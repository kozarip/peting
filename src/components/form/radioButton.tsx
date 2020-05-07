import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { styleForm } from '../../assets/styles/form';
import { colors, dimensions } from '../../assets/styles/variables';
import { createNewTypeObject } from './formHelpers';

type RadioButtonProps = {
  options: any;
  value: any;
  type: string;
  setValue: any;
  label: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  value,
  type,
  setValue,
  label,
}) => {
  return (
    <View>
      <Text style={styleForm.label as any}>
        {label}
      </Text>
      {Array.isArray(options) && options.map((res: any) => {
        return (
          <View key={res.key} style={styles.container}>
            <Text style={{ ...styleForm.cardInput, ...styles.radioInput }}>{res.text}</Text>
            <TouchableOpacity
              style={styles.radioCircle}
              onPress={() => {
                setValue(createNewTypeObject(type, res.key));
              }}
            >
              {value === res.key && <View style={styles.selectedRb} />}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  radioInput: {
    width: dimensions.fullWidth * 0.5,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: colors.primary,
  },
});

export default RadioButton;
