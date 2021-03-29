import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { connect } from 'react-redux';


function App(props) {
  return (
    <Router>
      <div className="container">
        <header className="row">
          <div>
            <Link className="brand" to="/">amazona</Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
            {props.cartItems.length > 0 && (
                <span className="badge">{props.cartItems.length}</span>
              )}
            </Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <main>
          <Switch>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/products/:id" component={ProductScreen} ></Route>
          </Switch>
        </main>
        <footer className="row center">
          All rights reserved!
    </footer>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems
  };
};


export default connect(mapStateToProps)(App);
