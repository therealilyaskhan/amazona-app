import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import addToCartAction from '../store/actionCreators/addToCartAction';

function CartScreen(props) {
  const productID = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

  useEffect(() => {
    if (productID) {
      props.addToCart(productID, qty);
    }
  }, []);

  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART : ProductID: {productID} Qty: {qty}
      </p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (productID, qty) => { dispatch(addToCartAction(productID, qty)); }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);