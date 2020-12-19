import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (name, value) => {
  console.log(`Save to localStorage : ${name} - ${value}`);
  try {
    await AsyncStorage.setItem(name, value);
  } catch (error) {
    // Error saving data
  }
};

const getItem = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null && value !== 'undefined') {
      return value;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  return false;
};

const LocalStorage = {
  setItem,
  getItem,
};

export default LocalStorage;
