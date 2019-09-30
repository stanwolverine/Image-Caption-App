import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <figure className='header-info'>
        <span className='header-info--avatar'>
          <i className='far fa-user' />
        </span>
        <figcaption className='header-info--detail'>Jatin Nagar</figcaption>
      </figure>

      <figure className='header-info'>
        <span className='header-info--avatar'>
          <i className='far fa-envelope' />
        </span>
        <figcaption className='header-info--detail'>
          Jitu19nagar@gmail.com
        </figcaption>
      </figure>

      <figure className='header-info'>
        <span className='header-info--avatar'>
          <i className='fas fa-mobile-alt' />
        </span>
        <figcaption className='header-info--detail'>+91 7011607335</figcaption>
      </figure>
    </header>
  );
}

export default Header;
