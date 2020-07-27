import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import Bio from './bio';
import Details from './details';
import ProfileTitle from './profileTitle';
import ImagesBox from './ImagesBox';
import { margins } from '../assets/styles/variables';


type PersonCardProps = {
  person: any,
  navigation: any,
}

const PersonCard: React.FC<PersonCardProps> = ({ person, navigation }) => {
  return (
    <Card
      containerStyle={styles.profileCard}
    >
      <ImagesBox
        navigation={navigation}
        animalImages={person.animalImages}
        images={person.images}
        primaryImage={person.primaryImageIndex}
        name={person.userName}
        age={person.age}
      />
      <ProfileTitle
        name={person.userName}
        age={person.age}
      />
      <ProfileTitle
        name={person.animalName}
        smallFont
      />
      <Bio bio={person.bio} />
      <Details details={
        [
          { 'Magasság (cm)': person.height },
          { Dohányzás: person.smokeFrequency },
          { Hajszín: person.hairColor },
          { Hobbik: person.hobbies },
        ]
      }
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    marginHorizontal: 0,
    borderRadius: 10,
    marginBottom: margins.sm,
    paddingBottom: 25,
  },
});

export default PersonCard;
