/*import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const Search = ({ handleChangeState }) => {
  const apiKey = 'character';

  const [value, setValue] = useState('');
    useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/${apiKey}/?name=${value}`);
        const data = await response.json();
        handleChangeState(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    // Trigger the API call when either 'value' or 'apiKey' changes
    fetchSearch();
  }, [apiKey, value, handleChangeState]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSearch();
  };

  return (
    <div>
      <div className="searchContainer">
        <form className="form" onSubmit={handleSubmit}>
          <label className="label">
            Search movies/videogames:
            <input
              className="submitText"
              type="text"
              placeholder="as rick would say 'welcome to the club, pal !'"
              value={value}
              onChange={handleChange}
            />
          </label>
          <Link to={`/search/${theme}/${value}`}>
            <button className="submit" type="submit">
              <i className="fa fa-search fa-2x"></i>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Search;*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [topic, setTopic] = useState('character');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  return (
    <div id="searchDiv">
      <form>
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
      
      <Link to={`/searchResult/${topic}/${searchTerm}`}>
        <button type="submit" className='search searchButton'>Search</button>
      </Link>
      </form>
    </div>
    
  );
};

export default Search;


