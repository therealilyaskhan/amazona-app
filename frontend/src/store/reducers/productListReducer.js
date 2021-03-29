import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../constants/actionTypes';

//we set initial state here because at the time of store creation when root reducer is passed to the createStore() function, the reducer is going to return an initial global state object which will be the initial state of the store; and then if our productList screen request these states from the store and if they weren't available in the store, we will get error;

const initialState = {
  loading: true,
  error: null,
  products: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        error: null,
        products: null
      };

    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        error: null,
        products: action.payload
      };

    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        products: null
      };

    default:
      return state;
  }
};

export default reducer;