import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styleForm } from '../../assets/styles/form';
import { colors } from '../../assets/styles/variables';
import { createNewTypeObject } from './formHelpers';

type TextBoxProps = {
  label: string,
  type: string,
  value?: string | number,
  placeholder?: string
  setValue: any
  mandatory?: boolean
  keyboardType?: 'default' | 'number-pad' | 'numeric' | 'email-address' | 'phone-pad'
}

const TextBox: React.FC<TextBoxProps> = ({
  label,
  type,
  value,
  placeholder,
  setValue,
  keyboardType,
  mandatory,
}) => {
  const placeHolderStyle = !value && placeholder ? { color: colors.separator } : {};

  return (
    <View style={styleForm.textBoxContainer}>
      <Text style={styleForm.label as any}>
        {label}
        {mandatory && <Text style={styleForm.mandatory}> *</Text>}
      </Text>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType || 'default'}
        style={{ ...styleForm.cardInput, ...placeHolderStyle}}
        onChangeText={(changedText) => {
          setValue(createNewTypeObject(type, changedText));
        }}
        value={value?.toString()}
      />
    </View>
  );
};

export default TextBox;
