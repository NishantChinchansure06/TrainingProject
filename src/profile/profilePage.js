import React, {useState, UseEffect} from 'react';
import {useContext} from 'react';
import {Text, View, Image, Button, TouchableOpacity} from 'react-native';
import {AuthContext} from '../navigation/authProvider';

const ProfilePage = props => {
  const {logout} = useContext(AuthContext);
  return (
    <>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#f2f2f0',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '48%',
              height: '100%',
              borderRadius: 100,
            }}>
            <Image
              source={{
                uri: 'https://image.moengage.com/melorramoengage/202107222036323274414GERRTMelorraLogoNewpngmelorramoengage.png',
              }}
              style={{
                height: '100%',
                width: '100%',
              }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 3,
            flexDirection: 'row',

            justifyContent: 'space-around',
            paddingTop: 20,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#ff8d6d',
              height: 30,
              width: '25%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Text style={{color: 'white'}}>Products</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              logout();
            }}
            style={{
              backgroundColor: '#ff8d6d',
              height: 30,
              width: '25%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Text style={{color: 'white'}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default ProfilePage;
