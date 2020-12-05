import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AddProduct from './components/AddProduct/AddProduct';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Products from './components/Products/Products';
import Promo from './components/Promo/Promo';
import Login from './components/Login/Login';
import { ClientContext } from './components/ClientContext';

function App() {
  const [products, setProducts] = useState([]);
  const [client, setClient] = useState({});
  const [promo, setPromo] = useState([]);

  return (
    <div className='App'>
      <ClientContext.Provider
        value={{ products, setProducts, promo, setPromo, client, setClient }}
      >
        <Router>
          <Header />
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/promo'>
              <Promo />
            </Route>
            <Route path='/products'>
              <Products />
            </Route>
            <Route path='/addproduct'>
              <AddProduct />
            </Route>
            <Route path='/'>
              <Body />
            </Route>
          </Switch>
        </Router>
      </ClientContext.Provider>
    </div>
  );
}

export default App;
