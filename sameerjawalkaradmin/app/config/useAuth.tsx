import {useContext} from 'react';
import AuthContext from './context';
import authStorage from './storage';
import {admin} from './types';

const useAuth = () => {
  const {adminData, setAdminData} = useContext(AuthContext);

  const logOut = () => {
    setAdminData(null);
    authStorage.removeData();
  };

  const logIn = async (admin: admin) => {
    setAdminData(admin);
    authStorage.storeData(admin);
  };

  return {adminData, logOut, logIn};
};

export default useAuth;
