import { REMOVE_FROM_CART_SUCCESS, REMOVE_FROM_CART_FAIL } from '../constants/actionTypes';

const removeFromCartAction = (productID) => {
  return async (dispatch, getState) => {

    try {
      dispatch({
        type: REMOVE_FROM_CART_SUCCESS,
        payload: productID
      });

      localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

    } catch (error) {

      // auto catches network / connection error
      dispatch({
        type: REMOVE_FROM_CART_FAIL,
        payload: error.message
      });

    }

  };
};

export default removeFromCartAction;