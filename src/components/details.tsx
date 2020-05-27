import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { margins, fonts } from '../assets/styles/variables';
import { styleContainer } from '../assets/styles/base';

type DetailProps = {
  details: any,
}

const Details: React.FC<DetailProps> = ({ details }) => {
  return (
    <View style={styles.detailsContainer}>
      {
        details.map((detail) => {
          const detailKey = Object.keys(detail)[0];
          if (detail[detailKey]) {
            return (
              <View
                key={detailKey}
                style={styles.detail}
              >
                <Text style={styles.detailKey}>{detailKey}</Text>
                <Text style={styles.detailValue}>{detail[detailKey]}</Text>
              </View>
            );
          }
          return <Text key={detailKey}> </Text>;
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
  },
  detailKey: {
    fontSize: fonts.default,
  },
  detailValue: {
    fontSize: fonts.default,
  },
});

export default Details;
