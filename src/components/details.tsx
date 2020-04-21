import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { margins, colors, fonts } from '../assets/styles/variables';
import { styleContainer } from '../assets/styles/base';

type DetailProps = {
  details
}

const Details: React.FC<DetailProps> = ({ details }) => {
  return (
    <View style={styles.detailsContainer}>
      {
        details.map((detail) => {
          const detailKey = Object.keys(detail)[0];
          return (
            <View
              key={detailKey}
              style={styles.detail}
            >
              <Text style={styles.detailKey}>{detailKey}</Text>
              <Text style={styles.detailValue}>{detail[detailKey]}</Text>
            </View>
          );
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop: margins.sm,
  },
  detail: {
    ...styleContainer as any,
    justifyContent: 'space-between',
    paddingBottom: margins.xsm,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  detailKey: {
    fontSize: fonts.default,
  },
  detailValue: {
    fontSize: fonts.default,
  },
});

export default Details;
