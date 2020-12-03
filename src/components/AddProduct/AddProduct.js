import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Database from '../../sheety';

const AddProduct = () => {
  const { register, handleSubmit } = useForm();

  const addProduct = async (data) => {
    const { name, brand, price, photo } = data;

    const findOne = await Database.get(`products?filter[name]=${name}`);

    console.log('podruto', findOne);

    if (!findOne.data.products.length) {
      let newProduct = {
        product: {
          name: name,
          brand: brand,
          price: price,
          likes: 0,
          dislikes: 0,
          photo: photo,
        },
      };

      await Database.post('products', newProduct);
      window.alert('Produto cadastrado com sucesso.');
      return;
    }

    window.alert('Produto com este nome já cadastrado.');
  };

  // price	likes	dislikes	photo
  return (
    <div className='row mt-5'>
      <div className='col-md-5 col-sm-8 col-11 mx-auto'>
        <form onSubmit={handleSubmit(addProduct)}>
          <h1 className='h3 mb-3 font-weight-normal'>
            Preencha os dados para adicionar um produto.
          </h1>
          <div className='form-label-group mt-2'>
            <label htmlFor='nome'>Nome do produto</label>
            <input
              type='name'
              id='name'
              name='name'
              className='form-control'
              placeholder='ex: Banjo série especial'
              required
              autoFocus
              ref={register}
            />
          </div>
          <div className='form-label-group mt-4'>
            <label htmlFor='senha'>Marca do produto</label>
            <input
              type='brand'
              id='brand'
              name='brand'
              className='form-control'
              placeholder='ex: Fender'
              required
              ref={register}
            />
          </div>
          <div className='form-label-group mt-4'>
            <label htmlFor='senha'>Preço do produto</label>
            <input
              type='price'
              id='price'
              name='price'
              className='form-control'
              placeholder='$$$'
              required
              ref={register}
            />
          </div>
          <div className='form-label-group my-4'>
            <label htmlFor='senha'>Foto nítida do produto</label>
            <input
              type='photo'
              id='photo'
              name='photo'
              className='form-control'
              placeholder='ex: https://media.istockphoto.com/photos/musical-instruments-picture-id894058154?s=170667a'
              required
              ref={register}
            />
          </div>
          <button className='btn btn-lg btn-primary btn-block' type='submit'>
            Enviar dados
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
