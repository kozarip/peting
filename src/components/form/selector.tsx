import React from 'react';
import { View, Picker, Text } from 'react-native';
import { styleForm } from '../../assets/styles/form';

type SelectorProps = {
  label: string;
  options: SelectorOptions[];
}

type SelectorOptions = {
  label: string;
  value: string;
}

const Selector: React.FC<SelectorProps> = ({ label, options }) => {
  return (
    <View>
      <Text style={styleForm.label as any}>{label}</Text>
      <Picker style={styleForm.cardInput}>
        {options.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
};

export default Selector;
