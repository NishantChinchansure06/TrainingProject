import React, {useState, useEffect, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomePage from '../../screens/welcomePage/WelcomePage';
import ProductPage from '../../screens/productDetails/ProductsPage';
import ProductDetails from '../../screens/productDetails/components/ProductDetails';
import Cart from '../../screens/cart/Cart';
import Wishlist from '../../screens/wishlist/wishList';
import {AuthProvider} from '../authProvider';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={WelcomePage} />
      <Stack.Screen name="Products" component={ProductPage} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
    </Stack.Navigator>
  );
};
export default AppRoutes;
