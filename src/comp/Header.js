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
          {/* <div class="buttonsDiv">
            <Link to="/characters">
              <button class="button button1">Characters</button>
            </Link>
            <Link to="/episodes">
              <button class="button button2">Episodes</button>
            </Link>
            <Link to="/locations">
              <button class="button button3">Locations</button>
            </Link>
          </div> */}
        
      </div>
  );
}

export default Header;