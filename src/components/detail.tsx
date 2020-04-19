import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Detail = ({ detailKey, detailValue }) => {
  return (
    <View style={styles.detail}>
      <Text style={styles.detailKey}>{detailKey}</Text>
      <Text style={styles.detailValue}>{detailValue}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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

export default Detail;
