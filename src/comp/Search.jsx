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


