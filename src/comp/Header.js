import React from 'react';
import {
  Link
} from 'react-router-dom';
import Search from './Search';


function Header() {
  return (
      <div id="header">
        <h2>
          {/* Texto de titulo de cabecera que nos va a dirigir siempre a la home */}
          <Link className="linkHeader" to="/"> 
            RICK AND MORTY
          </Link>
        </h2>
          <Search/> {/* Incluimos el script de search en un componente externo */}
      </div>
  );
}

export default Header;