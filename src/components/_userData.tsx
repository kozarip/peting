import React, { useState } from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Input, Card } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { styleContainer, styleBox } from '../assets/styles/base';
import { dimensions, fonts } from '../assets/styles/variables';

const UserData = ({ isFullForm, isWithRange }) => {
  const [heightRange, setHeightRange] = useState(['140', '210']);
  const [ageRange, setAgeRange] = useState(['20', '80']);

  return (
    <ScrollView>
      {isFullForm && <Input placeholder="Becenév" />}
      {isFullForm && <Input keyboardType="email-address" placeholder="Email" />}
      <Card>

        <View style={styles.fieldset}>
          <Text style={styles.rangeLabel}>Kor</Text>
          <View style={styles.rangeInputBox}>
            <TextInput
              style={styles.rangeInput}
              placeholder="min"
              keyboardType="numeric"
              value={ageRange[0]}
              onChangeText={(value) => setAgeRange([value, ageRange[1]])}
            />
            {isWithRange && <Text>-</Text>}
            {
              isWithRange
              && (
                <TextInput
                  style={styles.rangeInput}
                  placeholder="min"
                  keyboardType="numeric"
                  value={ageRange[1]}
                  onChangeText={(value) => setAgeRange([ageRange[0], value])}
                />
              )
            }
          </View>
        </View>
        <View style={styles.fieldset}>
          <Text style={styles.rangeLabel}>Magasság</Text>
          <View style={styles.rangeInputBox}>
            <TextInput
              style={styles.rangeInput}
              placeholder="min"
              keyboardType="numeric"
              value={heightRange[0]}
              onChangeText={(value) => setHeightRange([value, heightRange[1]])}
            />
            {isWithRange && <Text>-</Text>}
            {
              isWithRange
              && (
                <TextInput
                  style={styles.rangeInput}
                  placeholder="min"
                  keyboardType="numeric"
                  value={heightRange[1]}
                  onChangeText={(value) => setHeightRange([heightRange[0], value])}
                />
              )
            }
          </View>
        </View>
      </Card>
      <Card>

        <View style={styles.fieldset}>
          <Text style={styles.label}>Hajszín</Text>
          <Picker style={styles.fieldsetInput}>
            <Picker.Item label="Szőke" value="0" />
            <Picker.Item label="Barna" value="1" />
            <Picker.Item label="Fekete" value="2" />
          </Picker>
        </View>
        <View style={styles.fieldset}>
          <Text style={styles.label}>Tartott állat</Text>
          <Picker style={styles.fieldsetInput}>
            <Picker.Item label="Kutya" value="dog" />
            <Picker.Item label="Macska" value="cat" />
            <Picker.Item label="Hörcsög" value="hamster" />
            <Picker.Item label="Papagáj" value="parott" />
            <Picker.Item label="Görény" value="Polecat" />
          </Picker>
        </View>
        <View style={styles.fieldset}>
          <Text style={styles.label}>Dohányzás</Text>
          <Picker style={styles.fieldsetInput}>
            <Picker.Item label="Soha" value="0" />
            <Picker.Item label="Ritkán" value="1" />
            <Picker.Item label="Rendszeresen" value="2" />
          </Picker>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...styleContainer as any,
    alignItems: 'stretch',
  },
  textInputBox: {
    ...styleBox as any,
  },
  fieldset: {
    ...styleContainer as any,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginTop: 0,
    marginBottom: 0,
  },
  label: {
    flex: 1,
    width: dimensions.fullWidth * 0.666,
    fontSize: fonts.heading3,
  },
  rangeLabel: {
    flex: 1,
    width: dimensions.third,
    fontSize: fonts.heading3,
  },
  fieldsetInput: {
    width: dimensions.third,
    fontSize: 16,
  },
  rangeInputBox: {
    ...styleContainer as any,
    display: 'flex',
    width: dimensions.third,
    justifyContent: 'space-around',
  },
  rangeInput: {
    minWidth: 40,
    textAlign: 'center',
    fontSize: fonts.heading3,
    borderBottomColor: '#888888',
    borderBottomWidth: 1,
    marginBottom: 14,
  },
});

export default UserData;
