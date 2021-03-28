import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import data from './data';

//A redux store is nothing but a javascript object that represents the global state of our application
//in order to create a store we first need a reducer and an initial state of our application
const initialState = {};

const reducer = (state, action) => {
  return { products: data.products };
};

//we are ready to create a redux store now:
const store = createStore(reducer, initialState, applyMiddleware(thunk));

//now we are ready to connect this redux store with our react application
//and it is the store through which the components are going to dispatch actions and subscribe to it; because both the reducer and the store lives under the same umbrella;
export default store;
