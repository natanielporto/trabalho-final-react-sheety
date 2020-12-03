import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ClientContext } from '../ClientContext';

const Header = () => {
  let history = useHistory();
  const client = useContext(ClientContext);

  const loginLogout = () => {
    client.setClient({ id: null, name: '' });
    history.push('/user');
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <Link className='navbar-brand' to='/'>
        Musical Avenida
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarColor01'
        aria-controls='navbarColor01'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarColor01'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/products'>
              Produtos
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/promo'>
              Outlet
            </Link>
          </li>
          {client.client.email === 'natanielkporto@gmail.com' && (
            <li className='nav-item'>
              <Link className='nav-link' to='/addproduct'>
                Adicionar produtos
              </Link>
            </li>
          )}
        </ul>
        <div className='form-inline my-2 my-lg-0'>
          <Link
            className='nav-link'
            to='/login'
            onClick={loginLogout}
            style={{ color: 'white' }}
          >
            <i className='fas fa-users mr-2'></i>
            {client.client.name ? `${client.client.name}: sair` : 'Login'}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
