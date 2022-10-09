import React, {useState, useEffect, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../../screens/login/loginPage';
import SignUpPage from '../../screens/login/signUpPage';

const Stack = createNativeStackNavigator();

const LoginRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={LoginPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
    </Stack.Navigator>
  );
};
export default LoginRoutes;
