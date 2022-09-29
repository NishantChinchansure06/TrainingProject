import React, {useState, useEffect} from 'react';
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

const LoginPage = props => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  console.log('LoginPage App.js');
  const onLoginIdChange = event => {
    setLoginId(event);
  };

  const onPasswordChange = event => {
    console.log('Password value changed', event, typeof event);
    setPassword(event);
  };

  const onLoginPressed = event => {
    const credentials = {
      userLogin: loginId,
      userPassword: password,
    };
    console.log('Check user credentials', credentials);
  };

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
