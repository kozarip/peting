import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { localizations } from '../../services/localizations';
import { styleForm } from '../../assets/styles/form';
import { fonts, colors, margins } from '../../assets/styles/variables';
import { createNewTypeObject } from './formHelpers';

type SelectorProps = {
  label: string;
  options: SelectorOptions[];
  type: string;
  setValue: any;
  value: any;
  mandatory?: boolean;
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
    mandatory,
  },
) => {
  return (
    <View style={styleForm.textBoxContainer}>
      <Text style={styleForm.label as any}>
        {label}
        {mandatory && <Text style={styleForm.mandatory}> *</Text>}
      </Text>
      <View style={{ borderRadius: 20 }}>
        <RNPickerSelect
          placeholder={{
            label: localizations.t('placeholderSelect'),
          }}
          key={value}
          value={value}
          style={pickerSelectStyles}
          onValueChange={(selectedValue) => {
            if (selectedValue !== value) {
              setValue(createNewTypeObject(type, selectedValue));
            }
          }}
          items={options}
          useNativeAndroidPickerStyle={false}
        />
      </View>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginVertical: 5,
    fontSize: fonts.heading3,
    color: '#fff',
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  inputAndroid: {
    fontSize: fonts.heading3,
    /* backgroundColor: colors.primary,
    color: '#fff', */
  },
});

export default Selector;
