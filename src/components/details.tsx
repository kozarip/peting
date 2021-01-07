import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { margins, fonts, colors, dimensions } from '../assets/styles/variables';
import { styleContainer } from '../assets/styles/base';
import * as userFields from '../constants/userFields';

type DetailProps = {
  details: any,
}

const Details: React.FC<DetailProps> = ({ details }) => {
  const getDetailText = (type, value) => {
    let itemObject;
    let result = { label: userFields[type].label, value };
    switch (type) {
      case 'hobbies':
        itemObject = [];
        value.forEach((v) => {
          itemObject.push(userFields[type].options[v].label);
        });
        result.value = itemObject.join(', ');
        result.label = userFields[type].label;
        break;
      case 'hairColor':
        itemObject = userFields[type].options.find((element) => element.value === value);
        result.value = itemObject.label;
        break;
      case 'smokeFrequency':
        itemObject = userFields[type].options.find((element) => element.value === value);
        result.value = itemObject.label;
        break;
      case 'animalSize':
        itemObject = userFields[type].options.find((element) => element.value === value);
        result.value = itemObject.label;
        break;
      default:
        break;
    }
    return result;
  };

  return (
    <View style={styles.detailsContainer}>
      {
        details.map((detail) => {
          const detailKey = Object.keys(detail)[0];
          if (detail[detailKey]) {
            const { label, value } = getDetailText(detailKey, detail[detailKey]);
            return (
              <View
                key={detailKey}
                style={styles.detail}
              >
                <Text style={styles.detailKey}>{label}</Text>
                <Text style={styles.detailValue}>{value}</Text>
              </View>
            );
          }
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  detail: {
    ...styleContainer as any,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: margins.xsm,
  },
  detailKey: {
    color: colors.separator,
    fontSize: fonts.default,
  },
  detailValue: {
    color: colors.grey,
    fontSize: fonts.default,
    maxWidth: dimensions.fullWidth * 0.6,
  },
});

export default Details;
