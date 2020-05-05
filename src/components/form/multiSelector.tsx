import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { styleForm } from '../../assets/styles/form';
import { colors } from '../../assets/styles/variables';

type MultiSelectorProps = {
  options: any,
  label: string,
  setValue: any,
  value: any,
  type: string,
}

const MultiSelector: React.FC<MultiSelectorProps> = (
  {
    options,
    label,
    setValue,
    value,
    type,
  },
) => {
  console.log(value);
  return (
    <View>
      <Text style={styleForm.label as any}>{label}</Text>
      <SectionedMultiSelect
        items={options}
        uniqueKey="id"
        selectedText="kiválasztva"
        selectText="Válassz elemeket"
        showDropDowns
        confirmText="Kiválasztom"
        onSelectedItemsChange={(selectedValue) => {
          const obj = {};
          obj[type] = selectedValue;
          setValue(obj);
        }}
        selectedItems={value || []}
        colors={{
          primary: colors.primary,
        }}
      />
    </View>
  );
};

export default MultiSelector;
