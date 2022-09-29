import React, {useState, useEffect, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import AppRoutes from './appRoutes/appRoutes';
import LoginRoutes from './loginRoutes/loginRoutes';
import {AuthContext, AuthProvider} from './authProvider';

const Routes = props => {
  console.log('Running Routes.js', props);
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <LoginRoutes />}
    </NavigationContainer>
  );
};
export default Routes;
