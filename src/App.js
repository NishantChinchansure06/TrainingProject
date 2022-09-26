import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomePage from './screens/welcomePage/WelcomePage';
import ProductPage from './screens/productDetails/ProductsPage';
import ProductDetails from './screens/productDetails/components/ProductDetails';
import Cart from './screens/cart/Cart';
import {Provider} from 'react-redux';
import {store} from './store/store';
import Wishlist from './screens/wishlist/wishList';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={WelcomePage} />
          <Stack.Screen name="Products" component={ProductPage} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Wishlist" component={Wishlist} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
