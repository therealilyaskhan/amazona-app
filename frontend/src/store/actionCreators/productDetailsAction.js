import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from '../constants/actionTypes';

const productDetailsAction = (productID) => {
  return async (dispatch, getState) => {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST
    });

    try {
      const res = await fetch(`/api/products/${productID}`);
      if (!res.ok) { // error coming back from server
        throw Error('could not fetch the data for that resource');
      }
      const data = await res.json();

      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data
      });

    } catch (error) {

      if (error.name === 'AbortError') {
        console.log('fetch aborted');
        dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload: 'Fetch Aborted!'
        });
      } else {
        // auto catches network / connection error
        dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
      }

    }

  };
};

export default productDetailsAction;