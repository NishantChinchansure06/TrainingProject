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
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';

import {useSelector, useDispatch} from 'react-redux';
import {
  addToCart,
  removeFromCart,
  getCart,
  updateProductCount,
} from '../../store/action';
import CartCard from './components/cartCard';
import NavigationHeader from '../../navigationHeader';

const Cart = props => {
  const Products = useSelector(state => state.cartReducer);

  const dispatch = useDispatch();

  const [inCartProducts, setInCartProducts] = useState([]);
  const [productDeleted, setProductDeleted] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [totalCheckoutAmount, setTotalCheckoutAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const getCartAction = payload => dispatch(getCart(payload));
  //const removeItemAction = id => dispatch();

  console.log('cart products', Products);
  useEffect(() => {
    getCartAction();
    let totalAmount = 0;
    let totalCount = 0;
    inCartProducts.forEach(element => {
      let thisProductTotalAmount = element.count * element.price;
      totalAmount += thisProductTotalAmount;
      totalCount += element.count;
    });
    setTotalCheckoutAmount(totalAmount);
    setTotalItems(totalCount);
  }, [inCartProducts, productDeleted]);

  useEffect(() => {
    setInCartProducts(Products.cartItems);
  }, [Products]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <NavigationHeader navigation={props.navigation} />
      {inCartProducts.length ? (
        <View style={{flex: 1}}>
          <FlatList
            data={inCartProducts}
            renderItem={item => <CartCard item={item.item} />}
            keyExtractor={item => item.id}
          />
          {/* {inCartProducts.map(item => {
                return (
                  <CartCard
                    key={item.id}
                    item={item}
                    setProductDeleted={setProductDeleted}
                    productDeleted={productDeleted}
                  />
                );
              })} */}

          <Pressable
            style={{
              flex: 1,
              backgroundColor: '#ff8d6d',
              width: '100%',
              height: 40,
              borderRadius: 33,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 20,
            }}
            onPress={() => {
              console.log('show checkout pressed', showCheckout);
              setShowCheckout(true);
            }}>
            <Text style={{color: 'white', fontSize: 15}}>Checkout</Text>
          </Pressable>
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}>
            Opps!!!
          </Text>
          <Text style={{color: 'black'}}>Your cart is empty!! Shop now</Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#ff8d6d',
              borderRadius: 10,
              width: '40%',
              height: 30,
              marginTop: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              props.navigation.navigate('Products');
            }}>
            <Text style={{color: 'white', fontSize: 15}}>
              Checkout Products
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View>
        {showCheckout && (
          <Modal
            style={{margin: 0, justifyContent: 'flex-end'}}
            isVisible={showCheckout}
            onBackdropPress={() => setShowCheckout(false)}>
            <View
              style={{
                flex: 0.4,
                backgroundColor: 'white',
              }}>
              <View
                style={{
                  flex: 1,
                  margin: 10,

                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                  }}>{`Total Items: ${totalItems}`}</Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                  }}>{`Total Amount: ${totalCheckoutAmount}`}</Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                  }}>
                  Thanks for shopping with us
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#ff8d6d',
                      borderRadius: 10,
                      width: '60%',
                      height: 30,
                      marginTop: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => onPayPressed()}>
                    <Text style={{color: 'white', fontSize: 15}}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};
export default Cart;
