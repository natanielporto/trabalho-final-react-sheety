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
  }, [client.products]);

  const likes = async (id) => {
    let like = {
      like: {
        productId: id,
        clienteMail: client.client.mail,
        like: 1,
      },
    };

    await Database.post('likes', like);

    const reg = await Database.get('products/' + id);
    console.log(reg);
    let likes = Number(reg.data.product.likes) + 1;

    let productLike = {
      product: {
        likes: likes,
      },
    };

    await Database.put('products/' + id, productLike);

    alert('Obrigado por votar neste produto!');
  };

  const dislikes = async (mail) => {
    let dislike = {
      dislike: {
        productId: id,
        clienteMail: client.client.mail,
        like: 1,
      },
    };

    await Database.post('likes', dislike);

    const reg = await Database.get('products/' + id);
    console.log(reg);
    let dislikes = Number(reg.data.product.dislikes) + 1;

    let productDislike = {
      product: {
        dislikes: dislikes,
      },
    };

    await Database.put('products/' + id, productDislike);

    alert('Que pena. Mas obrigado por deixar a sua opinião!');
  };

  return (
    <div className='row'>
      {client.products.data &&
        client.products.data.products.map((el) => (
          <div className='col-9 d-flex align-items-center m-5' key={el.id}>
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
              <h3>Valor: {Number(el.price)}</h3>
              <h3 className='d-flex justify-content-between'>
                <button onClick={() => likes(el.id)}>
                  <i className='far fa-thumbs-up'> {el.likes}</i>
                </button>
                <button onClick={() => dislikes(el.id)}>
                  <i className='far fa-thumbs-down'> {el.dislikes}</i>
                </button>
              </h3>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
