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
  FlatList,
} from 'react-native';
import NavigationHeader from '../../navigationHeader';
import {useSelector, useDispatch} from 'react-redux';
import {addWishList, removeFromWishList, getWishList} from '../../store/action';
import ProductCard from '../productDetails/components/ProductCard';

const Wishlist = props => {
  const wishlistedProducts = useSelector(state => state.wishListReducer);
  const dispatch = useDispatch();
  const [productsWishlisted, setProductWishlisted] = useState([]);
  const getWishlistAction = () => dispatch(getWishList());

  useEffect(() => {
    getWishlistAction();
  }, [productsWishlisted]);

  useEffect(() => {
    setProductWishlisted(wishlistedProducts.wishList);
  }, [wishlistedProducts]);

  return (
    <View style={{flex: 1}}>
      <NavigationHeader navigation={props.navigation} />
      {productsWishlisted.length ? (
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {/* {productsWishlisted?.map(item => {
                return (
                  <View key={item.id} style={{flexBasis: '50%'}}>
                    <ProductCard navigation={props.navigation} item={item} />
                  </View>
                );
              })} */}
            <FlatList
              data={productsWishlisted}
              numColumns={2}
              renderItem={item => (
                <View style={{flexBasis: '50%'}}>
                  <ProductCard item={item.item} navigation={props.navigation} />
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}>
            Opps!!!
          </Text>
          <Text style={{color: 'black'}}>
            Your Wishlist is empty!! Shop now
          </Text>
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
    </View>
  );
};
export default Wishlist;
