import React, { useState, useEffect } from 'react';
import './App.css';
import Character from './comp/Character';
import Filter from './comp/Filter';
import { useLocation, Link, useHistory } from 'react-router-dom';

const FilteredCharactersList = () => {
  const [characterList, setCharacterList] = useState([]);
  const [prevPage, setPrevPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [filter, setFilter] = useState([]);
  const [apiKey, setApiKey] = useState('https://rickandmortyapi.com/api/character/?page=1');
  const [filterValue, setFilterValue] = useState(''); 
  const history = useHistory();

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const filterBy = params.get('filter');
        const filterValue = params.get('value');

        setFilterValue(filterValue);
        
        const apiUrl = `https://rickandmortyapi.com/api/character/?${filterBy}=${filterValue}+${filter}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        setCharacterList(data.results);
        setPrevPage(data.info.prev);
        setNextPage(data.info.next);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [location.search, filter]);

  const handleButtonClick = async () => {
    try {
      const response = await fetch(nextPage);
      const data = await response.json();

      setCharacterList(data.results);
      setPrevPage(data.info.prev);
      setNextPage(data.info.next);
    } catch (err) {
      console.error(err);
    }

    window.scrollTo({ top: 5, behavior: 'smooth' });
  };

  return (
    <div className="ListPage CharacterPage">
      <h2>{filterValue} List</h2>
      <Filter setFilter={setFilter} />
      <div className='characterList'>
        {characterList.map((character) => (
          <Link key={character.id} className="linkChar" to={`/character/${character.id}`}>
            <Character key={character.id} id={character.id} name={character.name} image={character.image} status={character.status} species={character.species} />
          </Link>
        ))}
      </div>

      {prevPage && (
        <button className="button" onClick={() => { setApiKey(prevPage); handleButtonClick();  }}>Prev</button>
      )}

      {nextPage && (
        <button className="button" onClick={() => { setApiKey(nextPage);  handleButtonClick();  }}>Next</button>
      )}
    </div>
  );
};

export default FilteredCharactersList;
