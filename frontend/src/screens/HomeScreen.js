import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import useFetch from '../useFetch';

const HomeScreen = () => {
  const { error, loading, data: products } = useFetch('/api/products');

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