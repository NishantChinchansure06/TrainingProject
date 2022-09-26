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

const initialState = {
  cartItems: [],
};
const initialProducts = {
  products: [
    {
      id: '1',
      image: 'https://www.freepngimg.com/thumb/fifa/11-2-fifa-png-images.png',
      brand: 'PS3',
      price: 2500,
      rating: 1,
      name: 'FIFA 20',
      description: 'The most hard FIFA ever',
      count: 1,
      isWishlisted: false,
      isAddedToCart: false,
    },
    {
      id: '2',
      image:
        'https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w',
      brand: 'OBI',
      price: 490.9,
      rating: 5,
      name: 'Grass Cut Machine',
      description: 'Grass Cut Machine for garden',
      count: 1,
      isWishlisted: false,
      isAddedToCart: false,
    },
    {
      id: '3',
      image:
        'https://lh3.googleusercontent.com/proxy/XRK6WCBqL7Yzk4Nfxm_d-cnRM4VzWCPMIL_B7rgDLPet9EGxjtCaUlE2odE5RavcduJDBngkiTi6YwGbI-t7mX_pdx1ZjdjKkRlcukoyPOb-pw',
      brand: 'Mobilix',
      price: 1000,
      rating: 5,
      name: 'Sofa',
      description: 'Big Sofa for living room',
      count: 1,
      isWishlisted: false,
      isAddedToCart: false,
    },
    {
      id: '4',
      image:
        'https://images.melorra.com/image/upload/f_webp,c_scale,w_1024/v1663300321/live-melorra/dev/catalogue/images/GI/OPT/580/W22CGI21F_P_580.png',
      brand: 'Melorra',
      price: 11700,
      rating: 5,
      name: 'Ring',
      description: 'Beautiful ring for girls',
      count: 1,
      isWishlisted: false,
      isAddedToCart: false,
    },
    {
      id: '5',
      image:
        'https://images.melorra.com/image/upload/f_webp,c_scale,w_515/f_webp,c_scale,w_515/v1663300321/live-melorra/dev/catalogue/images/GN/OPT/580/W21CGN15L_F_580.jpg',
      brand: 'Melorra',
      price: 10100,
      rating: 5,
      name: 'Bracelets',
      description: 'Beautiful Bracelets for girls',
      count: 1,
      isWishlisted: false,
      isAddedToCart: false,
    },
    {
      id: '6',
      image:
        'https://images.melorra.com/image/upload/f_webp,c_scale,w_1024/v1663300321/live-melorra/dev/catalogue/images/G2/OPT/1024/C16CG212S_F_1024.jpg',
      brand: 'Melorra',
      price: 15550,
      rating: 5,
      name: 'EarRing',
      description: 'Beautiful EarRing for girls',
      count: 1,
      isWishlisted: false,
      isAddedToCart: false,
    },
  ],
};
const initialWishList = {
  wishList: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDTOCART:
      return {cartItems: [...state.cartItems, action.payload]};

    case REMOVEFROMCART:
      const retrunArray = [];
      state.cartItems.forEach(element => {
        if (element.id !== action.id) {
          retrunArray.push(element);
        }
      });

      return {
        cartItems: [...retrunArray],
      };

    case UPDATECOUNT:
      const returnArray = state.cartItems.map(item => {
        if (item.id === action.productId) {
          if (action.operation === '+') {
            return {...item, count: item.count + 1};
          } else if (action.operation === '-') {
            return {...item, count: item.count === 1 ? 1 : item.count - 1};
          }
        } else {
          return item;
        }
      });

      return {
        cartItems: [...returnArray],
      };

    case GETCART:
      return {...state};
    default:
      return state;
  }
};

export const productReducer = (state = initialProducts, action) => {
  switch (action.type) {
    case GETPRODUCTS:
      return {...state};

    case GETPRODUCTBYID:
      return {...state};
    default:
      return state;
  }
};

export const wishListReducer = (state = initialWishList, action) => {
  switch (action.type) {
    case ADDTOWISHLIST:
      return {wishList: [...state.wishList, action.payload]};

    case REMOVEFROMWISHLIST:
      const retrunArray = [];
      state.wishList.forEach(element => {
        if (element.id !== action.id) {
          retrunArray.push(element);
        }
      });

      return {
        wishList: [...retrunArray],
      };

    case GETWISHLIST:
      return {...state};

    default:
      return {...state};
  }
};
