import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Auth } from 'aws-amplify';
import { CheckBox } from 'react-native-elements';
import { colors } from '../assets/styles/variables';
import { styleBox } from '../assets/styles/base';
import { clearStore } from '../store/action';

const AppSettings: React.FC = () => {
  const [hasNotification, setHasNotification] = useState(true);
  return (
    <View style={{ ...styleBox }} >
      <CheckBox
        title="Kérek értesítést (Nem működik)"
        checked={hasNotification}
        onPress={() => setHasNotification(!hasNotification)}
      />
      <Button
        color={colors.darkPrimary}
        title="Logout"
        onPress={() => {
          clearStore();
          Auth.signOut();
        }}
      />
    </View>
  );
};

export default AppSettings;
