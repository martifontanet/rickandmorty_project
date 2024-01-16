import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState(''); // guardamos el término de busqueda del usuario
  const [topic, setTopic] = useState('character');  // guardamos la categoria de busqueda del usuario

  const handleChange = (event) => {  // inicializamos funciones para que se ejecuten cada vez que el usuario modifica alguna letra o parámetro
    setSearchTerm(event.target.value);
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  return (
    <div id="searchDiv">
      <form> {/* Creamos un formulario para recolectar los criterios de búsqueda */}
        <select value={topic} className="search searchSelect" onChange={handleTopicChange}>
          <option value="character">Characters</option>
          <option value="episode">Episodes</option>
          <option value="location">Locations</option>
        </select>
        <input
          className='search searchBar'
          type="text"
          placeholder={`Search ${topic}s`}
          value={searchTerm}
          onChange={handleChange}
        />
      
        <Link to={`/searchResult/${topic}/${searchTerm}`}> {/* Pasamos los parametros de busqueda por la url de la web */}
          <button type="submit" className='search searchButton' disabled={!searchTerm}>
            Search
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Search;