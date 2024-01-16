import React from 'react';
import {
  Link
} from 'react-router-dom';
import Search from './Search';


function Header() {
  return (
      <div id="header">
        <h1 >
          <Link className="linkHeader" to="/">
            RICK AND MORTY
          </Link>
        </h1>
          <Search/>
      </div>
  );
}

export default Header;