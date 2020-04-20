import React, { useState } from 'react';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements';

const AppSettings: React.FC = () => {
  const [hasNotification, setHasNotification] = useState(true);
  return (
    <View>
      <CheckBox
        title="Kérek értesítést"
        checked={hasNotification}
        onPress={() => setHasNotification(!hasNotification)}
      />
    </View>
  );
};

export default AppSettings;
