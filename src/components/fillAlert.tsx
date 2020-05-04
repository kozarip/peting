import React from 'react';
import { Text, Button, View } from 'react-native';
import { Overlay } from 'react-native-elements';

type FillAlertProps = {
  isNewUser: boolean;
  setIsNewUser: any;
}

const FillAlert: React.FC<FillAlertProps> = ({ isNewUser, setIsNewUser }) => {
  return (
    <Overlay
      isVisible={isNewUser}
      windowBackgroundColor="rgba(255, 255, 255, 0.8)"
      overlayBackgroundColor="#fff"
      width="80%"
    >
      <View>
        <Text>
          Kérlek töltsd ki az adataidat
        </Text>
        <Button
          onPress={() => { setIsNewUser(false); }}
          title="Rendben"
        />
      </View>
    </Overlay>
  );
};

export default FillAlert;
