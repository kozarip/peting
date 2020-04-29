import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Button } from 'react-native-elements';

const SaveButton: React.FC = () => {
  const firebase = useFirebase();

  firebase.firestore()
    .collection('users')
    .where('age', '>', 18)
    .limit(1)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

  return (
    <Button
      title="Mentés"
      onPress={() => { firebase.updateProfile({ account: 'google' })}}
    />
  );
};

export default SaveButton;
