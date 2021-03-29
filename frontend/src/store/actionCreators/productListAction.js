import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../constants/actionTypes';

const productListAction = (url) => {
  return async (dispatch, getState) => {
    //Inside this returning function’s body, you first dispatch an immediate synchronous action to the reducer in the store to give some UI feedback to the user that you’ve started fetching list of Products from external API by executing some piece of code inside the reducer against this starter action type. Then you make the actual GET request to the server using fetch api or Axios. On a successful response from the server, you dispatch a synchronous success action with the data received from the response to the reducer, but on a failure response, we dispatch a different synchronous action with the error message to the reducer.
    dispatch({
      type: PRODUCT_LIST_REQUEST
    });

    try {
      const res = await fetch(url);
      if (!res.ok) { // error coming back from server
        throw Error('could not fetch the data for that resource');
      }
      const data = await res.json();

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data
      });

    } catch (error) {

      if (error.name === 'AbortError') {
        console.log('fetch aborted');
        dispatch({
          type: PRODUCT_LIST_FAIL,
          payload: 'Fetch Aborted!'
        });
      } else {
        // auto catches network / connection error
        dispatch({
          type: PRODUCT_LIST_FAIL,
          payload: error.message
        });
      }

    }

  };
};

export default productListAction;