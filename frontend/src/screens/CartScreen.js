import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import addToCartAction from '../store/actionCreators/addToCartAction';
import removeFromCartAction from '../store/actionCreators/removeFromCartAction';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';

function CartScreen(props) {
  const productID = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cartItems = props.cartItems;

  useEffect(() => {
    if (productID) {
      props.addToCart(productID, qty);
    }
  }, []);

  const removeFromCartHandler = (productID) => {
    if (productID) {
      props.removeFromCart(productID);
      props.history.push('/cart');
    }
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {
          cartItems.length === 0 ?
            <>
              <MessageBox msg="Cart is empty." >
                <Link to="/">Go Shopping</Link>
              </MessageBox>
            </> :
            (
              <ul>
                {
                  cartItems.map((item) => {
                    return (
                      <li key={item.product}>
                        <div className="row">
                          <div>
                            <img src={item.image} alt={item.name} className="small" />
                          </div>
                          <div className="min-30">
                            <Link to={`/products/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div>
                            <select
                              value={item.qty}
                              onChange={
                                e => props.addToCart(item.product, Number(e.target.value))
                              }>

                              {[...Array(item.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}

                            </select>
                          </div>
                          <div>
                            ${item.price}
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={
                                () => removeFromCartHandler(item.product)
                              }>
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })
                }
              </ul>
            )
        }
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal (
                  {
                  //reduce function returns integer (single val)
                  cartItems.reduce(
                    (a, c) => {
                      return a + c.qty;
                    },
                    0 //default accumulator value
                  )
                } Items): ${
                  cartItems.reduce(
                    (a, c) => {
                      return a + (c.qty * c.price);
                    },
                    0
                  )
                }
              </h2>
            </li>
            <li>
              <button type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}>
                Proceed to Checkout
                </button>
            </li>
          </ul>
        </div>
      </div>
    </div >
  );
}

//here we are subscribing to the state.car.carItems array property living inside the redux store, each time this state.cart.cartItems array is replace by a new array returned by any one of the reducers, we are going to get the updated array inside the props.carItems, and whenever new props are passed to a component, that component as a whole is always re-rendered always;
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (productID, qty) => { dispatch(addToCartAction(productID, qty)); },
    removeFromCart: (productID) => { dispatch(removeFromCartAction(productID)); }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);