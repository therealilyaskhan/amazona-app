import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from '../constants/actionTypes';

const initialState = {
  loading: true,
  error: null,
  product: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        error: null,
        product: null
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        error: null,
        product: action.payload
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        product: null
      };

    default:
      return state;
  }
};

export default reducer;