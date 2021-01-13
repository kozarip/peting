import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Card, Icon, Tooltip } from 'react-native-elements';
import { isSmallScreen } from '../services/shared';
import { localizations } from '../services/localizations';
import animalImages from '../constants/animalImages';
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
  const plusTitleClass = person.userName.length > 14 ? { fontSize: 24 } : {};

  return (
    <Card
      containerStyle={{
        ...styles.profileCard,
        ...isDetailsOpen ? styles.openedProfileCard : {},
      }}
    >
      <View style={styles.titleContainer}>
        <View style={styles.titleContainer}>
          <Text style={{
            ...styles.name,
            ...plusTitleClass,
          }}
          >
            {person.userName.trim()}
          </Text>
          <Text style={{
            ...styles.age,
            ...plusTitleClass,
          }}
          >
            {person.age}
          </Text>
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
                  {localizations.t('markHeartInfo')}
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
      <View>
        <TouchableOpacity onPress={() => setIsDetailsOpen((previsious) => !previsious)}>
          {
            isDetailsOpen ?
              <Icon
                name="angle-up"
                size={45}
                color={colors.separator}
                type="font-awesome"
              />
              :
              <Icon
                name="angle-down"
                size={45}
                color={colors.separator}
                type="font-awesome"
              />
          }
        </TouchableOpacity>
        <Image
          resizeMode="contain"
          style={styles.animalIcon}
          source={animalImages[person.animalType.toLowerCase()]}
        />
      </View>
      {isDetailsOpen &&
        <View>
          {person.bio ? <Bio bio={person.bio} /> : <></>}
          <Details details={
            [
              { animalSize: person.animalSize },
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
    height: dimensions.fullHeight - 182,
  },
  openedProfileCard: {
    height: 'auto',
    minHeight: dimensions.fullHeight - 182,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: colors.primary,
    fontSize: isSmallScreen() ? 26 : 34,
    marginRight: 10,
    flexShrink: 1,
    maxWidth: dimensions.fullWidth * 0.65,
  },
  age: {
    color: colors.grey,
    fontSize: isSmallScreen() ? 26 : 34,
  },
  city: {
    fontSize: isSmallScreen() ? 18 : 22,
    color: '#999',
    marginTop: isSmallScreen() ? -5 : margins.xsm,
    marginBottom: margins.sm,
    textAlign: 'center',
  },
  animal: {
    marginLeft: dimensions.fullWidth * 0.45,
    marginTop: dimensions.fullWidth * -0.18,
    marginBottom: -5,
    color: '#000',
    fontSize: isSmallScreen() ? 20 : 26,
  },
  animalIcon: {
    width: dimensions.fullWidth * 0.08,
    height: dimensions.fullWidth * 0.08,
    position: 'absolute',
    bottom: 10,
    right: 10,
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
