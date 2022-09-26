import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {cartReducer, productReducer, wishListReducer} from './reducers';

const rootRecuder = combineReducers({
  cartReducer,
  productReducer,
  wishListReducer,
});

export const store = createStore(rootRecuder, applyMiddleware(thunk));
