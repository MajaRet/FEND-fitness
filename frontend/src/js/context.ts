import { createContext } from 'react';

export interface UserType {
  id: string;
  name: string;
}
export const UserContext = createContext<UserType>({
  id: '',
  name: 'DefaultUser',
});
