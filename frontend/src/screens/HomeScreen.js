import Product from '../components/Product';
import data from '../data';

const HomeScreen = () => {
  return (
    <div className="row center">

      {
        data.products.map((product) => {
          return <Product key={product._id} product={product} />;
        })
      }

    </div>
  );
};

export default HomeScreen;