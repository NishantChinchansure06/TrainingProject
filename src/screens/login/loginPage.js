import React, {useState, useEffect, useContext} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Pressable,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {AuthContext} from '../../navigation/authProvider';
import {firebase} from '@react-native-firebase/database';
import '@react-native-firebase/firestore';

const LoginPage = props => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useContext(AuthContext);

  const onLoginIdChange = event => {
    setLoginId(event);
  };

  const onPasswordChange = event => {
    setPassword(event);
  };

  const onLoginPressed = event => {
    const credentials = {
      userLogin: loginId,
      userPassword: password,
    };
    login(credentials.userLogin, credentials.userPassword);
  };

  const usersRef = firebase.firestore().collection('users');
  console.log('Checking User ref', usersRef);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TextInput
        style={{
          width: '70%',
          borderRadius: 10,
          borderWidth: 1,
          marginBottom: 5,
        }}
        onChangeText={event => {
          onLoginIdChange(event);
        }}
        placeholder="Enter Login/Email"
      />
      <TextInput
        onChangeText={event => {
          onPasswordChange(event);
        }}
        style={{
          width: '70%',
          borderRadius: 10,
          borderWidth: 1,
        }}
        placeholder="Password"
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={event => {
          onLoginPressed(event);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '70%',
          borderRadius: 10,
          borderWidth: 0.5,
          marginTop: 20,
          height: 30,
          backgroundColor: '#ff8d6d',
        }}>
        <Text style={{color: 'white', fontSize: 15}}>Login</Text>
      </TouchableOpacity>
      <View
        style={{
          width: '70%',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <Text>Don't have an account yet? </Text>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('SignUp');
          }}>
          <Text style={{color: 'blue'}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;
