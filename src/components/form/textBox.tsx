import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styleForm } from '../../assets/styles/form';

type TextBoxProps = {
  label: string,
  value?: string,
  placeholder?: string
}

const TextBox: React.FC<TextBoxProps> = ({ label, value, placeholder }) => {
  return (
    <View>
      <Text style={styleForm.label as any}>
        {label}
      </Text>
      <TextInput
        style={styleForm.cardInput}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
};

export default TextBox;
