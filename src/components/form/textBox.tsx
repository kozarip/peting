import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styleForm } from '../../assets/styles/form';
import { colors } from '../../assets/styles/variables';

type TextBoxProps = {
  label: string,
  type: string,
  value?: string,
  placeholder?: string
  setValue: any
}

const TextBox: React.FC<TextBoxProps> = ({
  label,
  type,
  value,
  placeholder,
  setValue,
}) => {
  const placeHolderStyle = !value && placeholder ? { color: colors.separator } : {};

  return (
    <View>
      <Text style={styleForm.label as any}>
        {label}
      </Text>
      <TextInput
        style={{ ...styleForm.cardInput, ...placeHolderStyle }}
        onChangeText={(changedText) => {
          const obj = {};
          obj[type] = changedText;
          return setValue(obj);
        }}
        value={value}
      />
    </View>
  );
};

export default TextBox;
