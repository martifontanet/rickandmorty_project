import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Character from './comp/Character';
import Location from './comp/Location';
import Episode from './comp/Episode';
import Filter from './comp/Filter';

const SearchResults = ({ match }) => {
  const [list, setList] = useState([]);
  const topic = match.params.topic;
  const searchTerm = match.params.searchTerm;
  const [filter, setFilter] = useState([]);
  const [status, setStatus] = useState([]);
  let filtro1 = [];

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/${topic}/?name=${searchTerm + filter}`);
        const data = await response.json();
        setList(data.results || []); // Asegúrate de que data.results esté definido o asigna un array vacío

        const uniqueStatus = data.results?.map(item => item.status) || [];

        // Count unique species values using Set
        const status = [...new Set(uniqueStatus)];
        setStatus(status);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSearch();
  }, [topic, searchTerm, filter]);

  const handleTermChange = (event) => {
    filtro1 = status;
    setFilter(event.target.value);
  };

  return (
    <div className="ListPage SearchPage">
      <h2>Search term: <strong>{searchTerm}</strong></h2>
      <div>
        {topic === 'character' && (
          <Filter setFilter={setFilter} />
        )}
        <div className="characterList">
          {list.length === 0 ? (
            <p className='error'>No results found</p>
          ) : (
            list.map(item => (
              <Link key={item.id} className="linkChar" to={`/${topic}/${item.id}`} keyword={searchTerm}>
                {topic === 'character' ? (
                  <Character id={item.id} name={item.name} image={item.image} status={item.status} species={item.species} />
                ) : topic === 'location' ? (
                  <Location id={item.id} name={item.name} type={item.type} dimension={item.dimension} />
                ) : (
                  <Episode id={item.id} name={item.name} characters={item.characters} date={item.created} />
                )}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
