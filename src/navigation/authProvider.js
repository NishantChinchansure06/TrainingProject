import React, {useState, useEffect, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import '@react-native-firebase/firestore';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
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
        register: async userData => {
          try {
            await auth()
              .createUserWithEmailAndPassword(userData.email, userData.password)
              .then(response => {
                const uid = response.user.uid;
                const usersRef = firebase.firestore().collection('users');
                usersRef
                  .doc(uid)
                  .set({...userData, userId: uid})
                  .then(() => {
                    console.log('Successfully Added New User');
                  })
                  .catch(error => {
                    console.log('error get here', error);
                  });
              });
          } catch (err) {
            console.log('Error in SIGNIN: ', err);
          }
        },
        update: async (userId, newData) => {
          console.log('inside update authprovider :', userId, newData);
          firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .update(newData)
            .then(() => {
              console.log('User updated!');
            });
        },
        logout: async () => {
          try {
            const res = await auth().signOut();
            console.log('logout response', res);
          } catch (err) {
            console.log('Error in LOGOUT: ', err);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
