/* eslint-disable no-return-await */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { setGlobalSearchParams } from '../store/action';
import Modal from './modal';

import TextBox from './form/textBox';
import Selector from './form/selector';
import RadioButton from './form/radioButton';

import { styleForm } from '../assets/styles/form';

import {
  gender,
  animalType,
  smokeFrequency,
} from '../constants/userFields';
import { fonts, colors } from '../assets/styles/variables';

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
        <Modal
          iconName="spinner"
          isVisible={isLoaderActive}
          description="Adatok betöltése..."
        />
        <Card
          containerStyle={styleForm.cardBlock}
        >
          <Text style={styleForm.cardTitle}>Alapadatok</Text>
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
          <Text style={styleForm.cardTitle}>Kinézet</Text>
          <TextBox
            label="Minimum magasság (cm)"
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
          <Text style={styleForm.cardTitle}>Kedvenc</Text>
          {/* 
          <MultiSelector
            label="Állat fajták"
            options={animalType.options}
            type="animalType"
            setValue={setSearchParamsValue}
            value={searchParams.animalType}
          /> */}
          <Selector
            label={animalType.label}
            options={animalType.options}
            type="animalType"
            setValue={setSearchParamsValue}
            value={searchParams.animalType}
          />
          <Text style={styleForm.cardTitle}>Egyéb</Text>
          <Selector
            label={smokeFrequency.label}
            options={smokeFrequency.options}
            type="smokeFrequency"
            setValue={setSearchParamsValue}
            value={searchParams.smokeFrequency}
          />
        </Card>
      </ScrollView>
      <Button
        buttonStyle={styles.btnSave}
        titleStyle={{ fontSize: fonts.heading2 }}
        title="Mentés és keresés"
        onPress={handleSaveSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  btnSave: {
    backgroundColor: colors.primary,
  },
});

export default SearchComponent;
