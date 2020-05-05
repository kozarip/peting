import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styleForm } from '../../assets/styles/form';
import { colors } from '../../assets/styles/variables';

type TextBoxProps = {
  label: string,
  type: string,
  value?: string | number,
  placeholder?: string
  setValue: any
  keyboardType?: 'default' | 'number-pad' | 'numeric' | 'email-address' | 'phone-pad'
}

const TextBox: React.FC<TextBoxProps> = ({
  label,
  type,
  value,
  placeholder,
  setValue,
  keyboardType,
}) => {
  const placeHolderStyle = !value && placeholder ? { color: colors.separator } : {};

  return (
    <View>
      <Text style={styleForm.label as any}>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType || 'default'}
        style={{ ...styleForm.cardInput, ...placeHolderStyle }}
        onChangeText={(changedText) => {
          const obj = {};
          obj[type] = changedText;
          return setValue(obj);
        }}
        value={value?.toString()}
      />
    </View>
  );
};

export default TextBox;
