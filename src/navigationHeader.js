import React, {useEffect, useState} from 'react';
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
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {getCart} from './store/action';

const NavigationHeader = props => {
  const cartProducts = useSelector(state => state.cartReducer);

  const dispatch = useDispatch();

  const [productsInCart, setProductsInCart] = useState([]);

  const getCartAction = () => {
    dispatch(getCart());
  };

  useEffect(() => {
    getCartAction();
  }, [productsInCart]);

  useEffect(() => {
    setProductsInCart(cartProducts.cartItems);
  }, [cartProducts]);

  const showBack = props.isHomepage ? false : true;

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 10,
        }}>
        {showBack ? (
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{marginRight: 15}}>
            <Ionicons name="arrow-back" size={28} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Home');
          }}>
          <Image
            source={{
              uri: 'https://image.moengage.com/melorramoengage/202107222036323274414GERRTMelorraLogoNewpngmelorramoengage.png',
            }}
            style={{
              height: 25,
              width: 25,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginRight: 15,
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Wishlist');
          }}
          style={{marginRight: 15}}>
          <Icon name="hearto" color={'#ff8d6d'} size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Cart');
          }}>
          <Icon name="shoppingcart" color={'#ff8d6d'} size={30} />
          {productsInCart.length ? (
            <View
              style={{
                position: 'absolute',
                width: 20,
                height: 20,
                top: -5,
                right: -5,
                borderRadius: 75,
                borderColor: '#ff8d6d',
                borderWidth: 2,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#ff8d6d', marginTop: -2, fontSize: 12}}>
                {productsInCart.length}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavigationHeader;
