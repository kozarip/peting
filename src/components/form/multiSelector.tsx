import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { styleForm } from '../../assets/styles/form';

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
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        styles={{
          container: {

          },
        }}
      />
    </View>
  );
};

export default MultiSelector;
