import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import useFetch from '../useFetch';
import { useState } from 'react';


const globalOb = {
  name: 'ilyas'
};

const HomeScreen = () => {
  const { error, loading, data: products } = useFetch('/api/products');

  const [name, setName] = useState(globalOb.name);

  return (
    <div className="row center">

      { loading && <LoadingBox />}
      { error && <MessageBox msg={error} variant="danger" />}
      {
        products && products.map((product) => {
          return <Product key={product._id} product={product} />;
        })
      }

      <div>
        {name}
        <button onClick={() => { globalOb.name = 'khan'; console.log(name, globalOb.name); }}>click me</button></div>

    </div>
  );
};

export default HomeScreen;