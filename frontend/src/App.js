import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <Router>
      <div className="container">
        <header className="row">
          <div>
            <Link className="brand" to="/">amazona</Link>
          </div>
          <div>
            <Link to="/cart">Cart</Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <main>
          <Switch>
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

export default App;
