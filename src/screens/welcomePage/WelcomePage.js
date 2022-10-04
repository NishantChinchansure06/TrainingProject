import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import NavigationHeader from '../../navigationHeader';
import LoginPage from '../login/loginPage';
import SignUpPage from '../login/signUpPage';
import ProfilePage from '../../profile/profilePage';

const WelcomePage = props => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <NavigationHeader isHomepage={true} navigation={props.navigation} />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '95%',
        }}>
        <View style={{flex: 3}}>
          <Image
            source={{
              uri: 'https://image.moengage.com/melorramoengage/202107222036323274414GERRTMelorraLogoNewpngmelorramoengage.png',
            }}
            style={{
              marginTop: 5,
              height: '100%',
              width: '100%',

              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 25,

            // flexDirection: 'column',
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#0d0900'}}>
              Welcome to Melorra Clone
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#0d0900',
                marginTop: 10,
              }}>
              We are happy to see you!!
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#0d0900',
                marginTop: 10,
              }}>
              Please Checkout our latest Products
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Products');
            }}
            style={{
              width: '100%',
              backgroundColor: '#ff8d6d',
              justifyContent: 'center',
              alignItems: 'center',
              height: 35,
              borderRadius: 10,
              elevation: 3,
              marginBottom: 15,
            }}>
            <Text style={{color: 'white', fontSize: 17}}>
              Checkout Products
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default WelcomePage;
