import { ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL } from '../constants/actionTypes';

const addToCartAction = (productID, qty) => {
  return async (dispatch, getState) => {

    try {
      const res = await fetch(`/api/products/${productID}`);
      if (!res.ok) { // error coming back from server
        throw Error('could not fetch the product for that resource');
      }
      const product = await res.json();

      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: {
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.countInStock,
          qty
        }
      });

      localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

    } catch (error) {

      if (error.name === 'AbortError') {
        console.log('fetch aborted');
        dispatch({
          type: ADD_TO_CART_FAIL,
          payload: 'Fetch Aborted!'
        });
      } else {
        // auto catches network / connection error
        dispatch({
          type: ADD_TO_CART_FAIL,
          payload: error.response && error.response.product.message ? error.response.product.message : error.message
        });
      }

    }

  };
};

export default addToCartAction;