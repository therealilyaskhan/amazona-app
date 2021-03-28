import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useEffect } from 'react';


const HomeScreen = (props) => {

  useEffect(() => {
    //dispatch action from here. Remember, action won't go to the reducer right away; rather will be sent to the thunk (callback from the action creator), from the action creator the action object will be dispatched to the reducer
  }, []);

  return (
    <div className="row center">

      { loading && <LoadingBox />}
      { error && <MessageBox msg={error} variant="danger" />}
      {
        products && products.map((product) => {
          return <Product key={product._id} product={product} />;
        })
      }
    </div>
  );
};

export default HomeScreen;