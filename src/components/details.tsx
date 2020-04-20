import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

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
    marginTop: 10,
  },
  detail: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#bbbbbb',
  },
  detailKey: {
    fontSize: 16,
  },
  detailValue: {
    fontSize: 16,
  },
});

export default Details;
