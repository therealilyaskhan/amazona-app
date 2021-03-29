import { ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL } from '../constants/actionTypes';

const initialState = {
  cartItems: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_TO_CART_SUCCESS:
      const item = action.payload;
      const itemExists = state.cartItems.find((x) => x.product === item.product);
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map(x => x.product === itemExists.product ? item : x)
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        };
      }

    case ADD_TO_CART_FAIL:
      return {
        cart: state.cartItems
      };

    default:
      return state;
  }
};

export default reducer;