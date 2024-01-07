import React from 'react';
import {AdminContextType} from './types';

const AuthContext = React.createContext<AdminContextType>({
  adminData: null,
  setAdminData: () => {},
});

export default AuthContext;
