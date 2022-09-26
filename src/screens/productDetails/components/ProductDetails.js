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
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {
  addToCart,
  removeFromCart,
  getCart,
  addWishList,
  removeFromWishList,
  getWishList,
} from '../../../store/action';
import NavigationHeader from '../../../navigationHeader';
import Icon from 'react-native-vector-icons/AntDesign';

const ProductDetails = props => {
  const Product = props.route.params.data || {};
  const wishlistedProducts = useSelector(state => state.wishListReducer);
  const cartProducts = useSelector(state => state.cartReducer);
  const [productsInCart, setProductsInCart] = useState([]);
  const [showAddedToCartModal, setShowAddedToCartModal] = useState(false);
  const [productsWishlisted, setProductWishlisted] = useState([]);

  const dispatch = useDispatch();

  const getCartAction = () => dispatch(getCart());

  const addToWishList = () => dispatch(addWishList(Product));

  const removeFromWishListAction = () =>
    dispatch(removeFromWishList(Product?.id));

  useEffect(() => {
    getCartAction();
  }, []);

  useEffect(() => {
    setProductsInCart(cartProducts.cartItems);
  }, [cartProducts]);

  useEffect(() => {
    setProductWishlisted(wishlistedProducts.wishList);
  }, [wishlistedProducts]);

  const isPresentInCart = productsInCart?.some(item => {
    if (Product.id === item.id) {
      return true;
    }
  });

  const isWishlisted = productsWishlisted?.some(item => {
    if (Product?.id === item.id) {
      return true;
    }
  });

  return (
    <View>
      <NavigationHeader navigation={props.navigation} />
      <View style={{justifyContent: 'space-between'}}>
        <Image
          source={{uri: Product.image}}
          style={{
            marginTop: 5,
            height: '70%',
            width: '100%',
            borderRadius: 10,
          }}
        />
        <>
          {isWishlisted ? (
            <Icon
              name="heart"
              style={{position: 'absolute', top: 15, right: 10}}
              size={30}
              color={'red'}
              onPress={removeFromWishListAction}
            />
          ) : (
            <Icon
              name="hearto"
              style={{position: 'absolute', top: 15, right: 10}}
              size={30}
              onPress={addToWishList}
            />
          )}
        </>

        <View style={{marginLeft: 5, marginTop: 20}}>
          <Text
            style={{
              fontWeight: '900',
              color: 'black',
            }}>{`Price: ${Product.price}`}</Text>
          <Text>{Product.brand}</Text>
          <Text>{Product.name}</Text>
          <Text>{Product.description}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          {isPresentInCart ? (
            <Button
              title="Go to Cart"
              color="#ff8d6d"
              onPress={() => {
                props.navigation.navigate('Cart');
              }}
            />
          ) : isWishlisted ? (
            <Button
              title="Move to Cart"
              color="#ff8d6d"
              onPress={() => {
                dispatch(addToCart(Product));
                setShowAddedToCartModal(true);
              }}
            />
          ) : (
            <Button
              title="Add to Cart"
              color="#ff8d6d"
              onPress={() => {
                dispatch(addToCart(Product));
                setShowAddedToCartModal(true);
              }}
            />
          )}
          <Button
            title="Buy Now"
            color="#ff8d6d"
            onPress={() => setShowAddedToCartModal(true)}
          />
        </View>
        <View>
          {showAddedToCartModal && (
            <Modal
              style={{
                margin: 20,
                justifyContent: 'center',
                borderRadius: 10,
                alignItems: 'center',
              }}
              isVisible={showAddedToCartModal}
              onBackdropPress={() => setShowAddedToCartModal(false)}>
              <View
                style={{
                  height: '30%',
                  width: '90%',
                  backgroundColor: 'white',
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 25, color: 'black', fontWeight: 'bold'}}>
                    Great!!!
                  </Text>
                  <Text style={{fontWeight: 'bold', color: 'black'}}>
                    Product added to Cart Successfully
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: 'gray',
                      borderWidth: 1,
                      height: 40,
                      width: '30%',
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      setShowAddedToCartModal(false);
                      getCart();
                    }}>
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowAddedToCartModal(false);
                      props.navigation.navigate('Cart');
                    }}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#ff8d6d',
                      height: 40,
                      width: '30%',
                      borderRadius: 10,
                      borderColor: 'gray',
                      borderWidth: 1,
                    }}>
                    <Text style={{color: 'white'}}>Go to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </View>
    </View>
  );
};
export default ProductDetails;
