import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { Auth } from 'aws-amplify';
import { CheckBox, Button, Card } from 'react-native-elements';
import { colors, fonts } from '../assets/styles/variables';
import { styleForm } from '../assets/styles/form';
import { clearStore } from '../store/action';

const AppSettings: React.FC = () => {
  const [hasNotification, setHasNotification] = useState(true);
  return (
    <View>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
      >
        <Card
          containerStyle={styleForm.cardBlock}
        >
          <Text style={styleForm.cardTitle}>Értesítések</Text>
          <CheckBox
            title="Kérek értesítést (Nem működik)"
            checked={hasNotification}
            onPress={() => setHasNotification(!hasNotification)}
            uncheckedIcon={colors.primary}
            checkedColor={colors.primary}
            containerStyle={styles.checkBox}
            textStyle={styles.checkBoxText}
            size={30}
          />
          <CheckBox
            title="Kérek értesítést (Nem működik)"
            checked={hasNotification}
            onPress={() => setHasNotification(!hasNotification)}
            uncheckedIcon={colors.primary}
            checkedColor={colors.primary}
            containerStyle={styles.checkBox}
            textStyle={styles.checkBoxText}
            size={30}
          />
        </Card>
      </ScrollView>
      <Button
        buttonStyle={styles.btnSave}
        titleStyle={{ fontSize: fonts.heading2 }}
        title="Kijelentkezés"
        onPress={() => {
          clearStore();
          Auth.signOut();
        }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  btnSave: {
    backgroundColor: colors.primary,
  },
  checkBox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  checkBoxText: {
    color: colors.separator,
  },
});

export default AppSettings;
