import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { withOAuth } from 'aws-amplify-react-native';

const AppSettings: React.FC = (props) => {
  const { signOut } = props;

  const [hasNotification, setHasNotification] = useState(true);
  return (
    <View>
      <CheckBox
        title="Kérek értesítést"
        checked={hasNotification}
        onPress={() => setHasNotification(!hasNotification)}
      />
      <Button title="Logout" onPress={signOut} />
    </View>
  );
};

export default withOAuth(AppSettings);
