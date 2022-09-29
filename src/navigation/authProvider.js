import React, {useState, useEffect, createContext} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  console.log('Running AuthProvider.js');
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (err) {
            console.log('Error in LOGIN: ', err);
          }
        },
        register: async (email, password) => {
          try {
            console.log('Submit Pressed data', email, password);
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (err) {
            console.log('Error in SIGNIN: ', err);
          }
        },
        logout: async () => {
          try {
            await auth().signOut;
          } catch (err) {
            console.log('Error in LOGOUT: ', err);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
