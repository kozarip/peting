import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { styleForm } from '../../assets/styles/form';
import { fonts } from '../../assets/styles/variables';

type SelectorProps = {
  label: string;
  options: SelectorOptions[];
  type: string;
  setValue: any;
  value: any;
}

type SelectorOptions = {
  label: string;
  value: string;
}

const Selector: React.FC<SelectorProps> = (
  {
    label,
    options,
    type,
    value,
    setValue,
  },
) => {
  return (
    <View>
      <Text style={styleForm.label as any}>{label}</Text>
      <RNPickerSelect
        placeholder={{
          label: 'Válassz egy elemet',
          color: '#000',
        }}
        value={value}
        style={pickerSelectStyles}
        onValueChange={(selectedValue) => {
          const obj = {};
          obj[type] = selectedValue;
          setValue(obj);
        }}
        items={options}
      />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginVertical: 5,
    fontSize: fonts.heading3,
    color: '#000',
  },
  inputAndroid: {
    fontSize: fonts.heading3,
    color: '#000',
  },
});

export default Selector;
