import {
  ADDTOCART,
  REMOVEFROMCART,
  GETCART,
  GETPRODUCTS,
  GETPRODUCTBYID,
  UPDATECOUNT,
  ADDTOWISHLIST,
  REMOVEFROMWISHLIST,
  GETWISHLIST,
} from './actionType';

export const addToCart = Product => dispatch => {
  dispatch({
    type: ADDTOCART,
    payload: Product,
  });
};

export const getCart = () => dispatch => {
  dispatch({type: GETCART});
};

export const removeFromCart = id => dispatch => {
  dispatch({type: REMOVEFROMCART, id: id});
};

export const getProducts = () => dispatch => {
  dispatch({type: GETPRODUCTS});
};

export const getProductById = id => dispatch => {
  dispatch({type: GETPRODUCTBYID});
};

export const updateProductCount = (id, operation) => dispatch => {
  dispatch({
    type: UPDATECOUNT,
    productId: id,
    operation: operation,
  });
};

export const addWishList = Product => dispatch => {
  dispatch({
    type: ADDTOWISHLIST,
    payload: Product,
  });
};

export const removeFromWishList = id => dispatch => {
  dispatch({type: REMOVEFROMWISHLIST, id: id});
};

export const getWishList = () => dispatch => {
  dispatch({type: GETWISHLIST});
};
