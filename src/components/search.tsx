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
import { localizations } from '../services/localizations';
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
    distance: 600,
    isWithMarked: false,
  };

  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [isProfileModal, setIsProfileModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchParams({ ...searchParams, ...userAttributes.search });
  }, [userAttributes]);

  const setSearchParamsValue = (value) => {
    setSearchParams({ ...searchParams, ...value });
  };

  const { user } = useSelector((state) => state);

  const handleSaveSearch = () => {
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
          description={localizations.t('load')}
        />
        <Modal
          iconName="exclamation"
          isVisible={isProfileModal}
          description={localizations.t('firstProfile')}
          buttonPrimaryText={localizations.t('close')}
          handlePressButtonPrimary={() => { setIsProfileModal(false); }}
        />
        <Card
          containerStyle={styleForm.cardBlock}
        >
          <Text style={styleForm.cardTitle}>{localizations.t('baseData')}</Text>
          <RadioButton
            options={gender}
            value={searchParams.gender}
            type="gender"
            label={localizations.t('gender')}
            setValue={setSearchParamsValue}
          />
          <TextBox
            label={localizations.t('minAge')}
            type="minAge"
            keyboardType="number-pad"
            value={searchParams.minAge}
            setValue={setSearchParamsValue}
            maxLength={2}
          />
          <TextBox
            label={localizations.t('maxAge')}
            type="maxAge"
            keyboardType="number-pad"
            value={searchParams.maxAge}
            setValue={setSearchParamsValue}
            maxLength={2}
          />
          <TextBox
            label={localizations.t('distance')}
            type="distance"
            keyboardType="number-pad"
            value={searchParams.distance}
            setValue={setSearchParamsValue}
          />
          <Text style={styleForm.cardTitle}>{localizations.t('outFit')}</Text>
          <TextBox
            label={localizations.t('minHeight')}
            type="minHeight"
            keyboardType="number-pad"
            value={searchParams.minHeight}
            setValue={setSearchParamsValue}
          />
          <TextBox
            label={localizations.t('maxHeight')}
            type="maxHeight"
            keyboardType="number-pad"
            value={searchParams.maxHeight}
            setValue={setSearchParamsValue}
          />
          <Text style={styleForm.cardTitle}>{localizations.t('animal')}</Text>
          <MultiSelector
            label={localizations.t('species')}
            options={animalType.options}
            type="animalTypes"
            setValue={setSearchParamsValue}
            value={searchParams.animalTypes}
          />
          <Text style={styleForm.cardTitle}>{localizations.t('others')}</Text>
          <Selector
            label={smokeFrequency.label}
            options={smokeFrequency.options}
            type="smokeFrequency"
            setValue={setSearchParamsValue}
            value={searchParams.smokeFrequency}
          />
          <Text style={styleForm.cardTitle}>{localizations.t('searchOptions')}</Text>
          <CheckBox
            title={localizations.t('onlyUnmarked')}
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
        title={localizations.t('saveAndSearch')}
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
