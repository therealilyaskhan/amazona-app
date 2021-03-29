import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import productListAction from '../store/actionCreators/productListAction';
import { useEffect } from 'react';
import { connect } from 'react-redux';


const HomeScreen = (props) => {

  useEffect(() => {
    //dispatch action from here. Remember, action won't go to the reducer right away; rather will be sent to the thunk (callback from the action creator), from the action creator the action object will be dispatched to the reducer
    props.listProducts('/api/products');
  }, []);

  return (
    <div className="row center">

      { props.loading && <LoadingBox />}
      { props.error && <MessageBox msg={props.error} variant="danger" />}
      {
        props.products && props.products.map((product) => {
          return <Product key={product._id} product={product} />;
        })
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.productList.loading,
    error: state.productList.error,
    products: state.productList.products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listProducts: (url) => { dispatch(productListAction(url)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);



