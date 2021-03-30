import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import productDetailsAction from '../store/actionCreators/productDetailsAction';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const ProductScreen = (props) => {

  const productID = props.match.params.id;
  const [qty, setQty] = useState(1);

  useEffect(() => {
    props.detailsProduct(productID);
  }, []);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productID}?qty=${qty}`);
  };

  return (
    <div>
      {
        props.loading ? (
          <LoadingBox />
        ) : props.error ? (
          <MessageBox msg={props.error} variant="danger" />
        ) : (
          <div>
            <Link to="/">Back to results</Link>
            <div className="row top" >
              <div className="col-2">
                <img src={props.product.image} className="large" alt={props.product.name}></img>
              </div>
              <div className="col-1">
                <ul>
                  <li>
                    <h1>{props.product.name}</h1>
                  </li>
                  <li>
                    <Rating rating={props.product.rating} numReviews={props.product.numReviews} />
                  </li>
                  <li>
                    Price: ${props.product.price}
                  </li>
                  <li>
                    Description:
                <p>{props.product.description}</p>
                  </li>
                </ul>
              </div>
              <div className="col-1">
                <div className="card card-body">
                  <ul>
                    <li>
                      <div className="row">
                        <div>Price</div>
                        <div className="price">${props.product.price}</div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div>Status: </div>
                        {props.product.countInStock > 0 ? <span className="success">In Stock</span> : <span className="danger">Product Unavailable</span>}
                      </div>
                    </li>

                    {props.product.countInStock > 0 && (
                      <>
                        <li>
                          <div className="row">
                            <div>Qty</div>
                            <div>
                              <select
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(props.product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}

                              </select>
                            </div>
                          </div>
                        </li>
                        <li>
                          <button
                            onClick={addToCartHandler}
                            className="primary block"
                          >
                            Add to Cart
                        </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.productDetails.loading,
    error: state.productDetails.error,
    product: state.productDetails.product
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    detailsProduct: (productID) => { dispatch(productDetailsAction(productID)); }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);