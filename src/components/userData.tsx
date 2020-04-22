import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import DynamicForm from 'react-native-dynamic-form';

const form = [
  {
    key: 'manshgdsuudfg',
    type: 'text',
    required: true, // optional
    label: 'What is your last name?',
    placeholder: 'Last Name', // optional
    subtype: 'text', // one of text, tel, email and password
    maxlength: 30, // optional
    value: 'Salako', // optional
    disabled: false, // optional,
    icon: 'lock', // optional
  },
  {
    key: 'manshgdsuudfg',
    type: 'text',
    required: true, // optional
    label: 'What is your last name?',
    placeholder: 'Last Name', // optional
    subtype: 'text', // one of text, tel, email and password
    maxlength: 30, // optional
    value: 'Salako', // optional
    disabled: false, // optional,
    icon: 'lock', // optional
    validationFunc: (value) => {
      // do validation here and return bool status
    }, // optional
  },
  {
    key: 'jahaughabdvad',
    type: 'textarea',
    label: 'Please describe yourself in not more than 400 characters',
    placeholder: 'My name is John Doe and I am...', // optional
    maxlength: 400, // optional
    required: true, // optional
    value: '', // optional
    validationFunc: (value) => {
      // do validation here and return bool status
    }, // optional
  },
  {
    key: 'nabsgsgdhyshdhf',
    type: 'select',
    label: 'Languages Spoken',
    multiple: false, // enable multiple selection and displays selected items as tags, optional
    searchInputPlaceholder: 'Search Languages...',
    values: [
      {
        label: 'Yoruba',
        value: 'yoruba',
        selected: true, // selected value (can be used to preselect values too) optional
      },
      {
        label: 'Igbo',
        value: 'igbo',
      },
      {
        label: 'Hausa',
        value: 'hausa',
      },
      {
        label: 'English',
        value: 'english',
      },
      {
        label: 'Spanish',
        value: 'spanish',
      },
      {
        label: 'French',
        value: 'french',
      },
    ],
  },
];

const UserData = () => {
  return (
    <View style={styles.container}>
      <DynamicForm
        form={form}
        style={styles.formContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    marginTop: 10,
  },
});

export default UserData;
