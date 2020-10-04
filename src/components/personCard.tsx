import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, Icon, Tooltip } from 'react-native-elements';
import { isSmallScreenByHeight } from '../services/shared';
import Bio from './bio';
import Details from './details';
import ImagesBox from './imagesBox';
import { margins, colors, dimensions } from '../assets/styles/variables';
import EmotionMark from './emotionMark';

type PersonCardProps = {
  person: any,
  navigation: any,
  connectedEmotions?: any,
  handlePressConectedEmotions?: any,
}

const PersonCard: React.FC<PersonCardProps> = (
  { person, navigation, connectedEmotions, handlePressConectedEmotions }
) => {
  const onlyCityName = person.cityName ? person.cityName.split(',')[0] : '';
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  return (
    <Card
      containerStyle={styles.profileCard}
    >
      <View style={styles.titleContainer}>
        <View style={styles.titleContainer} >
          <Text style={styles.name}>{person.userName.trim()}</Text>
          <Text style={styles.age}>{person.age}</Text>
        </View>
        <View style={styles.emotionMarkBox}>
          {
            connectedEmotions && connectedEmotions.map((emotion) => (
              <EmotionMark
                key={emotion}
                type={emotion}
                handlePressConectedEmotions={handlePressConectedEmotions}
              />
            ))
          }
          {connectedEmotions && connectedEmotions.length > 0 &&
            <Tooltip
              backgroundColor={colors.primary}
              height={80}
              width={dimensions.fullWidth * 0.8}
              popover={
                <Text style={styles.toolTipImageText}>
                  A szív azt jelzi hogy az adott szemére már nyomtál like vagy dislike gombot
                  Újra rákattintva törölheted ezt.
                </Text>
              }
            >
              <Icon
                name="info"
                size={12}
                raised
                color={colors.primary}
                containerStyle={{marginTop: 10}}
                type="font-awesome"
              />
            </Tooltip>
          }
        </View>
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
    minHeight: dimensions.fullHeight - 198,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: colors.primary,
    fontSize: isSmallScreenByHeight() ? 26 : 34,
    marginRight: 10,
    flexShrink: 1,
  },
  age: {
    color: colors.grey,
    fontSize: isSmallScreenByHeight() ? 26 : 34,
  },
  city: {
    fontSize: isSmallScreenByHeight() ? 18 : 22,
    color: '#999',
    marginTop: isSmallScreenByHeight() ? -5 : margins.xsm,
    marginBottom: margins.sm,
    textAlign: 'center',
  },
  animal: {
    color: '#000',
    fontSize: isSmallScreenByHeight() ? 20 : 26,
    marginLeft: dimensions.fullWidth * 0.45,
    marginTop: dimensions.fullWidth * -0.18,
    marginBottom: 0,
  },
  toolTipImageText: {
    color: '#fff',
  },
  emotionMarkBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default PersonCard;
