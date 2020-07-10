import React from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import { styleBox } from '../assets/styles/base';

type FillAlertProps = {
  isNewUser: boolean;
  setIsNewUser: any;
}

const NewUserAlert: React.FC<FillAlertProps> = ({ isNewUser, setIsNewUser }) => {
  return (
    <Overlay
      isVisible={isNewUser}
      windowBackgroundColor="rgba(255, 255, 255, 0.8)"
      overlayBackgroundColor="#fff"
      width="80%"
    >
      <View style={styleBox as any}>
        <Text style={styles.title}>
          Üdvözöllek az a petingben!
        </Text>
        <Text style={styles.title}>
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

const styles = StyleSheet.create({
  title: {
    fontSize: 21,
  },
});

export default NewUserAlert;
