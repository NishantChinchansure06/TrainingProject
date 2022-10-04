import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import ProductCard from './components/ProductCard';
import {useSelector, useDispatch} from 'react-redux';
import {getProducts} from '../../store/action';
import NavigationHeader from '../../navigationHeader';

const ProductPage = props => {
  const productState = useSelector(state => state.productReducer);

  const dispatch = useDispatch();

  const [Products, setProducts] = useState(productState.products);

  const getProductsList = () => dispatch(getProducts());

  useEffect(() => {
    setProducts(productState.products);
  }, [productState]);

  useEffect(() => {
    getProductsList();
  }, [productState]);
  // const Products = props.route.params.data || [];
  return (
    <View>
      <NavigationHeader navigation={props.navigation} />
      <ScrollView>
        <View
          style={{
            flex: 1,
            //backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {/* <FlatList
              data={Products}
              numColumns={2}
              renderItem={item => (
                <View style={{flexBasis: '50%'}}>
                  <ProductCard item={item.item} navigation={props.navigation} />
                </View>
              )}
              keyExtractor={item => item.id}
            /> */}
            {Products.map(item => {
              return (
                <View key={item.id} style={{flexBasis: '50%'}}>
                  <ProductCard navigation={props.navigation} item={item} />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default ProductPage;
