import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import productListReducer from './reducers/productListReducer';
import productDetailsReducer from './reducers/productDetailsReducer';
import cartReducer from './reducers/cartReducer';

//A redux store is nothing but a javascript object that represents the global state of our application
//in order to create a store we first need a reducer and an initial state of our application
const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
  }
};
const reducers = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer
};

const rootReducer = combineReducers(reducers);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//we are ready to create a redux store now:
const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(thunk)));

//now we are ready to connect this redux store with our react application
//and it is the store through which the components are going to dispatch actions and subscribe to it; because both the reducer and the store lives under the same umbrella;
export default store;
