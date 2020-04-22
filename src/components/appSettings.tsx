import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AuthService from '../services/auth';

const AppSettings: React.FC = () => {
  const [hasNotification, setHasNotification] = useState(true);
  return (
    <View>
      <CheckBox
        title="Kérek értesítést"
        checked={hasNotification}
        onPress={() => setHasNotification(!hasNotification)}
      />
      <Button title="Logout" onPress={AuthService.logout} />
    </View>
  );
};

export default AppSettings;
