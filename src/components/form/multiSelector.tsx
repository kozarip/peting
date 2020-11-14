import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { localizations } from '../../services/localizations';
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
  const transformOptionsForMultiselect = (rawOptions) => {
    return rawOptions.map((opt, i) => {
      return { id: i, name: opt.label };
    });
  };

  return (
    <View>
      <Text style={styleForm.label as any}>{label}</Text>
      <SectionedMultiSelect
        IconRenderer={Icon}
        items={transformOptionsForMultiselect(options) || []}
        uniqueKey="id"
        selectedText={localizations.t('selected')}
        selectText={localizations.t('placeholderMultiSelect')}
        showDropDowns
        confirmText={localizations.t('select')}
        onSelectedItemsChange={(selectedValue) => {
          setValue(createNewTypeObject(type, selectedValue));
        }}
        selectedItems={value || []}
        colors={{
          primary: colors.primary,
          selectToggleTextColor: colors.grey,
        }}
      />
    </View>
  );
};

export default MultiSelector;
