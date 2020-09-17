import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import Bio from './bio';
import Details from './details';
import ImagesBox from './imagesBox';
import { margins, colors, dimensions } from '../assets/styles/variables';

type PersonCardProps = {
  person: any,
  navigation: any,
  connectedEmotions?: any
}

const PersonCard: React.FC<PersonCardProps> = ({ person, navigation, connectedEmotions }) => {
  const onlyCityName = person.cityName ? person.cityName.split(',')[0] : '';
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <Card
      containerStyle={styles.profileCard}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.name}>{person.userName.trim()}</Text>
        <Text style={styles.age}>{person.age}</Text>
        {
          connectedEmotions && connectedEmotions.like && 
          <Icon
            containerStyle={styles.emotionMark}
            name="heart"
            size={20}
            color={colors.primary}
            type="font-awesome"
          />
        }
        {
          connectedEmotions && connectedEmotions.dislike && 
          <Icon
            containerStyle={styles.emotionMark}
            name="heart"
            size={20}
            color="#000"
            type="font-awesome"
          />
        }
      </View>
      <Text style={styles.city}>{onlyCityName}</Text>
      <ImagesBox
        navigation={navigation}
        animalImages={person.animalImages}
        images={person.images}
        primaryImage={person.primaryImageIndex}
        name={person.userName}
        age={person.age}
        animalName={person.animalName}
      />
      <Text style={styles.animal}>{person.animalName}</Text>
      <TouchableOpacity onPress={() => setIsDetailsOpen((previsious) => !previsious)}>
        {
          isDetailsOpen ?
            <Icon
              name="angle-up"
              size={45}
              color="#ced4da"
              type="font-awesome"
            />
            :
            <Icon
              name="angle-down"
              size={45}
              color="#ced4da"
              type="font-awesome"
            />
        }
      </TouchableOpacity>
      {isDetailsOpen &&
        <View>
          {person.bio ? <Bio bio={person.bio} /> : <></>}
          <Details details={
            [
              { height: person.height },
              { smokeFrequency: person.smokeFrequency },
              { hairColor: person.hairColor },
              { hobbies: person.hobbies },
            ]
          }
          />
        </View>
      }
    </Card>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: margins.sm,
    paddingBottom: margins.sm,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {
    color: colors.primary,
    fontSize: 34,
    marginRight: 10,
    flexShrink: 1,
  },
  age: {
    color: colors.grey,
    fontSize: 34,
  },
  city: {
    fontSize: 22,
    color: '#999',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  animal: {
    color: '#000',
    fontSize: 26,
    marginLeft: dimensions.fullWidth * 0.45,
    marginTop: -80,
    marginBottom: 20,
  },
  emotionMark: {
    marginLeft: 10,
    marginTop: 15,
  },
});

export default PersonCard;
