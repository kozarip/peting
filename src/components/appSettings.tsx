import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Auth } from 'aws-amplify';
import { CheckBox } from 'react-native-elements';
import { colors } from '../assets/styles/variables';

const AppSettings: React.FC = () => {
  const [hasNotification, setHasNotification] = useState(true);
  return (
    <View>
      <CheckBox
        title="Kérek értesítést"
        checked={hasNotification}
        onPress={() => setHasNotification(!hasNotification)}
      />
      <Button
        color={colors.darkPrimary}
        title="Logout"
        onPress={() => { Auth.signOut(); }}
      />
    </View>
  );
};

export default AppSettings;
