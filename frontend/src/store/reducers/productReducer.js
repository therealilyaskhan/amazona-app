import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../constants/actionTypes';

//whenever the store.dispatch() method runs the Action object is automatically passed to the reducer function(s) that are connected to the redux store
const productListReducer = (state, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        data: null
      };

    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload
      };

    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null
      };

    default:
      return state;
  }
};