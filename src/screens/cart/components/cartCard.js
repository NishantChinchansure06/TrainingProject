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
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useSelector, useDispatch} from 'react-redux';
import {
  addToCart,
  removeFromCart,
  getCart,
  updateProductCount,
} from '../../../store/action';

const CartCard = props => {
  const [qauntity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const Product = props.item || {};

  const addQuantity = () => {
    dispatch(updateProductCount(Product.id, '+'));
    setQuantity(qauntity + 1);
  };
  const substractQuantity = () => {
    dispatch(updateProductCount(Product.id, '-'));
    qauntity === 1 ? setQuantity(1) : setQuantity(qauntity - 1);
  };

  const deleteFromCart = () => {
    dispatch(removeFromCart(Product.id));
    dispatch(getCart());
  };

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        height: 200,
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 5,
      }}>
      <View
        style={{
          flex: 2,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}>
        <Image
          source={{
            uri: Product.image,
          }}
          style={{
            height: '100%',
            width: '100%',
            margin: '2%',
            borderRadius: 10,
          }}
        />
      </View>
      <View
        style={{
          flex: 3,
          marginLeft: 5,
          marginVertical: 5,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 5,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 17}}>
            {Product.brand}
          </Text>
          {/* <TouchableOpacity onPress={deleteFromCart}>
            <Text style={{fontSize: 17, color: 'red'}}>X</Text>
          </TouchableOpacity> */}
        </View>

        <Text>{Product.description}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 30,
              width: 30,
              backgroundColor: 'white',
              borderRadius: 10,
              borderColor: 'black',
              borderWidth: 1,
            }}
            onPress={substractQuantity}>
            <Text>-</Text>
          </TouchableOpacity>
          <View
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
              borderColor: 'black',
              borderWidth: 1,
              marginHorizontal: 2,
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
              }}>
              {Product.count}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 30,
              width: 30,
              backgroundColor: 'white',
              borderRadius: 10,
              borderColor: 'black',
              borderWidth: 1,
            }}
            onPress={addQuantity}>
            <Text>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 30,
              width: 30,
              backgroundColor: 'white',
              borderRadius: 10,
              borderColor: 'black',
              borderWidth: 1,
              marginLeft: 2,
            }}
            onPress={deleteFromCart}>
            <AntDesign name="delete" size={20} color={'red'} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 17,
          }}>{`₹ ${Product.price}`}</Text>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
          }}>{`Total Payable Amount: `}</Text>
        <Text>{`${Product.count} quantity X ${Product.price} price = ${
          Product.count * Product.price
        }`}</Text>
      </View>
    </View>
  );
};

export default CartCard;
