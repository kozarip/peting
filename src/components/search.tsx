/* eslint-disable no-return-await */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Platform,
} from 'react-native';
import { Card, Button, CheckBox } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenuId, setGlobalSearchParams } from '../store/action';
import Modal from './modal';

import TextBox from './form/textBox';
import Selector from './form/selector';
import RadioButton from './form/radioButton';
import MultiSelector from './form/multiSelector';

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
    animalTypes: [],
    smokeFrequency: '',
    hairColor: '',
    minAge: 0,
    maxAge: 99,
    hobbies: [],
    distance: 20,
    isWithMarked: false,
  };

  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [isProfileModal, setIsProfileModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchParams({ ...searchParams, ...userAttributes.search });
  }, []);

  const setSearchParamsValue = (value) => {
    setSearchParams({ ...searchParams, ...value });
  };

  const { user } = useSelector((state) => state)

  const handleSaveSearch = () => {
    console.log(user);
    if (user.cityLat === 0) {
      setIsProfileModal(true);
      return;
    }
    setIsLoaderActive(true);
    const newUserObject = { ...userAttributes, ...{ search: searchParams } };
    setUserAttributes(newUserObject);
    saveUser(newUserObject);
    setIsLoaderActive(false);
    dispatch(setGlobalSearchParams({
      searchParams: newUserObject.search,
    }));
    dispatch(setActiveMenuId(2))
    navigation.navigate('Result');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.container}
      >
        <Modal
          iconName="spinner"
          isVisible={isLoaderActive}
          description="Adatok betöltése..."
        />
        <Modal
          iconName="exclamation"
          isVisible={isProfileModal}
          description="Kérlek elősször a profilodat töltsd ki!"
          buttonPrimaryText="Bezárás"
          handlePressButtonPrimary={() => { setIsProfileModal(false); }}
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
          <MultiSelector
            label="Állat fajták"
            options={animalType.options}
            type="animalTypes"
            setValue={setSearchParamsValue}
            value={searchParams.animalTypes}
          />
          <Text style={styleForm.cardTitle}>Egyéb</Text>
          <Selector
            label={smokeFrequency.label}
            options={smokeFrequency.options}
            type="smokeFrequency"
            setValue={setSearchParamsValue}
            value={searchParams.smokeFrequency}
          />
          <Text style={styleForm.cardTitle}>Kereső feltételek</Text>
          <CheckBox
            title="Csak a jelöletlenek keresése"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor={colors.primary}
            size={30}
            uncheckedColor={colors.primary}
            checked={searchParams.isWithMarked}
            textStyle={{ color: colors.separator, fontWeight: 'normal', fontSize: fonts.heading3 }}
            containerStyle={styleForm.checkBox}
            onPress={() => setSearchParamsValue({ isWithMarked: !searchParams.isWithMarked })}
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
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: colors.primary,
  },
});

export default SearchComponent;
