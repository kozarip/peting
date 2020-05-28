/* eslint-disable no-return-await */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  Alert,
} from 'react-native';
import { Card } from 'react-native-elements';
import Search from '../services/search';

import TextBox from './form/textBox';
import Selector from './form/selector';
import RadioButton from './form/radioButton';

import { styleForm } from '../assets/styles/form';
import { colors } from '../assets/styles/variables';
import Loader from './loader';

import {
  gender,
  hairColor,
  animalType,
  animalSize,
  smokeFrequency,
  hobbies,
} from '../constants/userFields';
import MultiSelector from './form/multiSelector';

type searchComponentProps = {
  userAttributes: any,
  saveUser: any,
  setUserAttributes: any,
  navigation: any,
};

const SearchComponent: React.FC<searchComponentProps> = (
  {
    userAttributes,
    saveUser,
    setUserAttributes,
    navigation,
  },
) => {
  const initialSearchParams = {
    gender: -1,
    minHeight: 0,
    maxHeight: 0,
    animalSize: '',
    animalType: '',
    smokeFrequency: '',
    hairColor: '',
    minAge: 0,
    maxAge: 0,
    hobbies: [],
  };

  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const search = new Search();

  useEffect(() => {
    setSearchParams({ ...searchParams, ...userAttributes.search });
  }, []);

  const setSearchParamsValue = (value) => {
    setSearchParams({ ...searchParams, ...value });
  };

  const handleSaveSearch = () => {
    setIsLoaderActive(true);
    const newUserObject = { ...userAttributes, ...{ search: searchParams } };
    setUserAttributes(newUserObject);
    saveUser(newUserObject);
    Alert.alert('Sikeres mentés');
    setIsLoaderActive(false);
    search.search(searchParams).then((response) => {
      console.log(response);
      navigation.navigate('Result');
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Loader isActive={isLoaderActive} />
        <Card
          containerStyle={styleForm.cardBlock}
          title="Alapadatok"
          titleStyle={styleForm.cardTitle as any}
        >
          <RadioButton
            options={gender}
            value={searchParams.gender}
            type="gender"
            label="Nem"
            setValue={setSearchParamsValue}
          />
          <TextBox
            label="Minimum kor"
            type="minAge"
            keyboardType="number-pad"
            value={searchParams.minAge}
            setValue={setSearchParamsValue}
          />
          <TextBox
            label="Maximum kor"
            type="maxAge"
            keyboardType="number-pad"
            value={searchParams.maxAge}
            setValue={setSearchParamsValue}
          />
        </Card>

        <Card
          containerStyle={styleForm.cardBlock}
          title="Kinézet"
          titleStyle={styleForm.cardTitle as any}
        >
          <TextBox
            label="Minimum agasság (cm)"
            type="minHeight"
            keyboardType="number-pad"
            value={searchParams.minHeight}
            setValue={setSearchParamsValue}
          />
          <TextBox
            label="Maximum magasság (cm)"
            type="maxHeight"
            keyboardType="number-pad"
            value={searchParams.maxHeight}
            setValue={setSearchParamsValue}
          />
          <Selector
            label={hairColor.label}
            options={hairColor.options}
            type="hairColor"
            setValue={setSearchParamsValue}
            value={searchParams.hairColor}
          />
        </Card>

        <Card
          containerStyle={styleForm.cardBlock}
          title="Állat"
          titleStyle={styleForm.cardTitle as any}
        >
          <Selector
            label={animalType.label}
            options={animalType.options}
            type="animalType"
            setValue={setSearchParamsValue}
            value={searchParams.animalType}
          />
          <Selector
            label={animalSize.label}
            options={animalSize.options}
            type="animalSize"
            setValue={setSearchParamsValue}
            value={searchParams.animalSize}
          />
        </Card>

        <Card
          containerStyle={styleForm.cardBlock}
          title="Egyéb"
          titleStyle={styleForm.cardTitle as any}
        >
          <Selector
            label={smokeFrequency.label}
            options={smokeFrequency.options}
            type="smokeFrequency"
            setValue={setSearchParamsValue}
            value={searchParams.smokeFrequency}
          />
          <MultiSelector
            label="Hobbijaid"
            options={hobbies}
            type="hobbies"
            setValue={setSearchParamsValue}
            value={searchParams.hobbies}
          />
        </Card>
      </ScrollView>
      <Button
        color={colors.darkPrimary}
        title="Mentés és Keresés"
        onPress={handleSaveSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});

export default SearchComponent;
