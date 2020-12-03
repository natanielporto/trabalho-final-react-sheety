import React, { useEffect, useContext } from 'react';

import { ClientContext } from '../ClientContext';
import Database from '../../sheety';

const Promo = () => {
  const client = useContext(ClientContext);

  const fetchData = async () => {
    client.setPromo(await Database.get('promo'));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='row'>
      {client.promo.data &&
        client.promo.data.promo.map((el) => (
          <div className='col-9 d-flex align-items-center m-5 container-promo' key={el.name}>
            <img
              src={el.photo}
              alt={`Foto ${el.name}`}
              className='mr-5'
              style={{ width: '250px', boxShadow: '2px 2px 2px 2px' }}
            />
            <h3 className="promo p-3" style={{position: "absolute", top: 20, left: 180, background: 'red', color: 'white'}}><strong>{el.off}% off!</strong></h3>
            <div className='p-3' style={{ maxWidth: '450px' }}>
              <h3>
                <strong>Modelo: {el.name}</strong>
              </h3>
              <h3>Marca: {el.brand}</h3>
              <h3>Valor: {el.price - (el.off / 100)}</h3>
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

export default Promo;
