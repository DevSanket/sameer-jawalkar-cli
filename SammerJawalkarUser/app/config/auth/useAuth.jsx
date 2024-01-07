import {useContext} from 'react';
import AuthContext from './context';
import authStorage from './storage';

const useAuth = () => {
  const {userData, setUserData} = useContext(AuthContext);

  const logOut = () => {
    setUserData(null);
    authStorage.removeData();
  };

  const logIn = async user => {
    setUserData(user);
    authStorage.storeData(user);
  };

  const EditUserData = async user => {
    setUserData(user);
    authStorage.storeData(user);
  };

  return {userData, setUserData, logOut, logIn, EditUserData};
};

export default useAuth;
