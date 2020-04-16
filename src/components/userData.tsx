import React, { useState } from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Input } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const UserData = ({ isFullForm, isWithRange }) => {
  const [heightRange, setHeightRange] = useState(['140', '210']);
  const [ageRange, setAgeRange] = useState(['18', '80']);


  return (
    <ScrollView>
      {isFullForm && <Input placeholder="Becenév" />}
      {isFullForm && <Input keyboardType="email-address" placeholder="Email" />}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  textInputBox: {
    flex: 1,
  },
  fieldset: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginTop: 0,
    marginBottom: 0,
  },
  label: {
    flex: 1,
    width: width * 0.666,
    fontSize: 18,
    fontWeight: 'bold',
  },
  rangeLabel: {
    flex: 1,
    width: width * 0.3,
    fontSize: 18,
    fontWeight: 'bold',
  },
  fieldsetInput: {
    width: width * 0.3333,
    fontSize: 16,
  },
  rangeInputBox: {
    flex: 1,
    width: width * 0.33,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rangeInput: {
    minWidth: 40,
    textAlign: 'center',
    fontSize: 18,
    borderBottomColor: '#888888',
    borderBottomWidth: 1,
    marginBottom: 14,
  },
});

export default UserData;
