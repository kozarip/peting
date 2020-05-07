import React from 'react';
import { View, Text } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { styleForm } from '../../assets/styles/form';
import { colors } from '../../assets/styles/variables';
import { createNewTypeObject } from './formHelpers';

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
          setValue(createNewTypeObject(type, selectedValue));
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
