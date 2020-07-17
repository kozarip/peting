/* eslint-disable no-return-await */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
} from 'react-native';
import { Card } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { setGlobalSearchParams } from '../store/action';

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
    maxHeight: 999,
    animalSize: '',
    animalType: '',
    smokeFrequency: '',
    hairColor: '',
    minAge: 0,
    maxAge: 99,
    hobbies: [],
    distance: 20,
  };

  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const dispatch = useDispatch();

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
    setIsLoaderActive(false);
    dispatch(setGlobalSearchParams({
      searchParams: newUserObject.search,
    }));
    navigation.navigate('Result');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
      >
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
          <TextBox
            label="Távolság (km)"
            type="distance"
            keyboardType="number-pad"
            value={searchParams.distance}
            setValue={setSearchParamsValue}
          />
        </Card>

        <Card
          containerStyle={styleForm.cardBlock}d
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
