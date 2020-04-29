import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { styleForm } from '../../assets/styles/form';
import { colors } from '../../assets/styles/variables';

const MultiSelector = ({ options, label }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const onSelectedItemsChange = (items) => {
    setSelectedItems(items);
  };

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
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        colors={{
          primary: colors.primary,
        }}
      />
    </View>
  );
};

export default MultiSelector;
