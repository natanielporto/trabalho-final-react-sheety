import React, { useEffect, useState } from 'react';
import Database from '../../sheety';

const Body = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const allProducts = await Database.get('products');
    setProducts(allProducts.data.products);
    console.log(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className='container'>
      <div className='row'></div>
    </div>
  );
};

export default Body;
