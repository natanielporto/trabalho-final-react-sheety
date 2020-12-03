import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import md5 from 'md5';
import { ClientContext } from '../ClientContext';

import Database from '../../sheety';
// import './LoginUser.css';

const CreateUser = () => {
  let history = useHistory();
  const client = useContext(ClientContext);
  const { register, handleSubmit } = useForm();

  const createClient = async (data) => {
    const { name, email } = data;

    const password = md5(data.password);

    const id = Date.now();

    const findOne = await Database.get(
      `clients?filter[email]=${email}&filter[password]=${md5(password)}`
    );

    if (!findOne.data.clients.length) {
      let newClient = {
        client: {
          id: id,
          name: name,
          email: email,
          password: password,
        },
      };

      await Database.post('clients', newClient);
      client.setClient({
        id: id,
        name: name,
      });
      window.alert('Cadastro criado com sucesso.');
      history.push('/');
    }

    window.alert('Você já possui cadastro com a gente.');
  };

  return (
    <div className='row mt-5'>
      <div className='col-md-5 col-sm-8 col-11 mx-auto'>
        <form onSubmit={handleSubmit(createClient)}>
          <h1 className='h3 mb-3 font-weight-normal'>
            Preencha os dados para fazer o seu login.
          </h1>
          <div className='form-label-group'>
            <label htmlFor='nome'>Informe seu nome</label>
            <input
              type='name'
              id='name'
              name='name'
              className='form-control'
              placeholder='Nome Sobrenome'
              required
              autoFocus
              ref={register}
            />
          </div>
          <div className='form-label-group'>
            <label htmlFor='nome'>Informe seu e-mail</label>
            <input
              type='email'
              id='email'
              name='email'
              className='form-control'
              placeholder='seunome@provedordeemail.com.br'
              required
              ref={register}
            />
          </div>
          <div className='form-label-group'>
            <label htmlFor='senha'>Crie uma senha</label>
            <input
              type='password'
              id='password'
              name='password'
              className='form-control'
              placeholder='senha de acesso'
              required
              ref={register}
            />
          </div>
          <button className='btn btn-lg btn-primary btn-block' type='submit'>
            Criar seu cadastro
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
