import AsyncStorage from '@react-native-async-storage/async-storage';
import {admin} from './types';

const key = 'AdminID';

const storeData = async (value: admin) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Error While Storing Data', error);
  }
};

const getData = async () => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log('Error While Getting Data', error);
  }
};

const removeData = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Error while Deleting User', error);
  }
};

export default {
  getData,
  storeData,
  removeData,
};
