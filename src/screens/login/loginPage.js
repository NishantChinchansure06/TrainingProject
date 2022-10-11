import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import {AuthContext} from '../../navigation/authProvider';
import {firebase} from '@react-native-firebase/database';
import '@react-native-firebase/firestore';
import RazorpayCheckout from 'react-native-razorpay';
import base64 from 'react-native-base64';

const LoginPage = props => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useContext(AuthContext);
  // const Razorpay = require('razorpay');

  const onPayPresssed = async () => {
    console.log('Pay Pressed: ');
    // var instance = new Razorpay({
    //   key_id: 'rzp_test_JLHM8OQS9KP082',
    //   key_secret: 'wGaBeN7aJBJbdV45Rz0WozTT',
    // });

    // const requestOptions = {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({
    //     amount: 500000,
    //     currency: 'INR',
    //     receipt: 'receipt#1',
    //     notes: {
    //       key1: 'value3',
    //       key2: 'value2',
    //     },
    //   }),
    // };

    // try {
    //   console.log('Pay Pressed: 1:');
    //   const res = await fetch(
    //     'https://api.razorpay.com/v1/orders',
    //     requestOptions,
    //   ).then(response => {
    //     response.json().then(data => {
    //       console.log('Post created at : ', data.createdAt);
    //     });
    //   });
    //   console.log('Pay Pressed: 2: ', res);
    // } catch (error) {
    //   console.error(error);
    // }

    try {
      const auth =
        'Basic ' +
        base64.encode(
          'rzp_test_JLHM8OQS9KP082' + ':' + 'wGaBeN7aJBJbdV45Rz0WozTT',
        );

      console.log('Auth token: ', auth);
      const res = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Basic ' +
            base64.encode(
              'rzp_test_JLHM8OQS9KP082' + ':' + 'wGaBeN7aJBJbdV45Rz0WozTT',
            ),
        },
        body: JSON.stringify({
          amount: 500000,
          currency: 'INR',
          receipt: 'receipt#1',
          notes: {
            key1: 'value3',
            key2: 'value2',
          },
        }),
      })
        .then(response => response.json())
        .then(order => console.log(order));
      console.log('Pay Pressed: 1: ', res);
    } catch (error) {
      console.log('Create Order Error: ', error);
    }

    //   .then(response => response.json())
    //   .then(order => console.log(order));

    // const res = instance.orders.create({
    //   amount: 500000,
    //   currency: 'INR',
    //   receipt: 'receipt#1',
    //   notes: {
    //     key1: 'value3',
    //     key2: 'value2',
    //   },
    // });

    // var options = {
    //   description: 'Credits towards consultation',
    //   image: 'https://i.imgur.com/3g7nmJC.jpg',
    //   currency: 'INR',
    //   key: 'rzp_test_JLHM8OQS9KP082',
    //   amount: '50000',
    //   name: 'Acme Corp',
    //   order_id: 'order_KRwmgDsHD24VZT', //Replace this with an order_id created using Orders API.
    //   prefill: {
    //     email: 'abc@abc.com',
    //     contact: '9191919191',
    //     name: 'Nishant Kumar',
    //   },
    //   theme: {color: '#53a20e'},
    // };
    // RazorpayCheckout.open(options)
    //   .then(data => {
    //     // handle success
    //     alert(`Success: ${data.razorpay_payment_id}`);
    //   })
    //   .catch(error => {
    //     // handle failure
    //     console.log('Pay Pressed: ', error);
    //     alert(`Error: ${error.code} | ${error.description}`);
    //   });
  };

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
      <View
        style={{
          width: '70%',
          height: '37%',

          borderRadius: 150,
          marginBottom: 20,
        }}>
        <Image
          source={{
            uri: 'https://image.moengage.com/melorramoengage/202107222036323274414GERRTMelorraLogoNewpngmelorramoengage.png',
          }}
          style={{
            marginTop: 6,
            height: '100%',
            width: '100%',

            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
      <View
        style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
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
        <TouchableOpacity
          onPress={event => {
            onPayPresssed();
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
          <Text style={{color: 'white', fontSize: 15}}>Pay</Text>
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
    </View>
  );
};

export default LoginPage;
