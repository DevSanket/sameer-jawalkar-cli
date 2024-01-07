import {Dispatch, SetStateAction} from 'react';

export interface admin {
  username: string;
}

export type AdminContextType = {
  adminData: admin | null;
  setAdminData: Dispatch<SetStateAction<null | admin>>;
};
