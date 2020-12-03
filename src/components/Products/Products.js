import React, { useEffect, useContext } from 'react';

import { ClientContext } from '../ClientContext';
import Database from '../../sheety';

const Products = () => {
  const client = useContext(ClientContext);

  const fetchData = async () => {
    client.setProducts(await Database.get('products'));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='row'>
      {client.products.data &&
        client.products.data.products.map((el) => (
          <div className='col-9 d-flex align-items-center m-5' key={el.name}>
            <img
              src={el.photo}
              alt={`Foto ${el.name}`}
              className='mr-5'
              style={{ width: '250px', boxShadow: '2px 2px 2px 2px' }}
            />
            <div className='p-3' style={{ maxWidth: '450px' }}>
              <h3>
                <strong>Modelo: {el.name}</strong>
              </h3>
              <h3>Marca: {el.brand}</h3>
              <h3>Valor: {el.price}</h3>
              <h3 className='d-flex justify-content-between'>
                <span>Likes: {el.likes}</span>
                <span>Dislikes: {el.dislikes}</span>
              </h3>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
