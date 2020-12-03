import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import md5 from 'md5';
import { ClientContext } from '../ClientContext';
import CreateUser from '../CreateUser/CreateUser';
import Database from '../../sheety';

const Login = () => {
  let history = useHistory();
  const client = useContext(ClientContext);
  const { register, handleSubmit } = useForm();
  const [newRegister, setNewRegister] = useState(false);

  const session = async (data) => {
    const email = data.email;
    const password = md5(data.password);

    const findOne = await Database.get(
      `clients?filter[email]=${email}&filter[password]=${password}`
    );

    if (findOne.data.clients.length) {
      client.setClient({
        id: findOne.data.clients[0].id,
        name: findOne.data.clients[0].name,
        email: findOne.data.clients[0].email,
      });
      history.push('/');
    }

    setNewRegister(true);
    console.log(
      'Para personalizar suas ofertas, primeiro cadastre-se com o formulário no fim da página.'
    );
  };

  return (
    <>
      {newRegister === false ? (
        <div className='row mt-5'>
          <div className='col-md-5 col-sm-8 col-11 mx-auto'>
            <form onSubmit={handleSubmit(session)}>
              <h1 className='h3 mb-3 font-weight-normal'>
                Preencha os dados para fazer o login.
              </h1>
              <p>
                <i>Ofertas incríveis toda semana para você!</i>
              </p>
              <div className='form-label-group'>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='form-control'
                  placeholder='ex: seunome@provedordeemail.com.br'
                  required
                  autoFocus
                  ref={register}
                />
                <label htmlFor='nome'>E-mail cadastrado</label>
              </div>
              <div className='form-label-group'>
                <input
                  type='password'
                  id='password'
                  name='password'
                  className='form-control'
                  placeholder='senha de acesso'
                  required
                  ref={register}
                />
                <label htmlFor='senha'>Informe sua senha</label>
              </div>
              <button
                className='btn btn-lg btn-primary btn-block'
                type='submit'
              >
                Enviar dados
              </button>
            </form>
          </div>
        </div>
      ) : (
        <CreateUser />
      )}
    </>
  );
};

export default Login;
