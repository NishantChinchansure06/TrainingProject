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
import {withNavigation} from 'react-navigation';
import {useSelector, useDispatch} from 'react-redux';
import {
  addWishList,
  removeFromWishList,
  getWishList,
} from '../../../store/action';

const styles = StyleSheet.create({
  stretch: {
    width: 20,
    height: 50,
  },
});

const ProductCard = props => {
  const wishlistedProducts = useSelector(state => state.wishListReducer);
  const imgURL = props.item?.image || '';
  const dispatch = useDispatch();

  const [productsWishlisted, setProductWishlisted] = useState([]);

  const addToWishList = () => dispatch(addWishList(props.item));
  const removeFromWishListAction = () =>
    dispatch(removeFromWishList(props.item?.id));

  let isWishlisted;
  useEffect(() => {
    isWishlisted = productsWishlisted?.some(item => {
      if (props.item?.id === item.id) {
        return true;
      }
    });
  }, [props.item]);

  useEffect(() => {
    setProductWishlisted(wishlistedProducts.wishList);
  }, [wishlistedProducts]);

  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('ProductDetails', {data: props.item});
      }}>
      <View
        style={{
          margin: '2%',
          borderWidth: 0.1,
          borderRadius: 10,
          height: 300,
          alignItems: 'center',
          elevation: 3,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            width: '100%',
            borderRadius: 10,
          }}>
          <View style={{flex: 4}}>
            <Image
              source={{
                uri: imgURL,
              }}
              style={{
                marginTop: 5,
                height: '70%',
                width: 184,
                borderRadius: 10,
              }}
            />

            {isWishlisted ? (
              <Icon
                name="heart"
                style={{position: 'absolute', top: 15, right: 10}}
                size={20}
                color={'red'}
                onPress={removeFromWishListAction}
              />
            ) : (
              <Icon
                name="hearto"
                style={{position: 'absolute', top: 15, right: 10}}
                size={20}
                onPress={addToWishList}
              />
            )}
          </View>
          <View style={{flex: 1.5, marginLeft: 5, marginTop: 5}}>
            <Text
              style={{
                fontWeight: '900',
                color: 'black',
              }}>{`Price: ${props.item?.price}`}</Text>
            <Text>{props.item?.brand}</Text>
            <Text>{props.item?.name}</Text>
          </View>

          {/* <Text>{props.item.description}</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
