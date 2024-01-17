import React, { useState, useEffect } from 'react';
import './App.css';
import Character from './comp/Character';
import Filter from './comp/Filter';
import { useLocation, Link } from 'react-router-dom';

const FilteredCharactersList = () => {
  const [characterList, setCharacterList] = useState([]);
  const [prevPage, setPrevPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [filter, setFilter] = useState([]);
  const [apiKey, setApiKey] = useState('https://rickandmortyapi.com/api/character/?page=1');
  const [uniqueSpecies, setUniqueSpecies] = useState([]);
  const [filterValue, setFilterValue] = useState(''); // Agregar esta línea

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const filterBy = params.get('filter');
        const filterValue = params.get('value');

        setFilterValue(filterValue); // Agregar esta línea

        const apiUrl = filterBy && filterValue
          ? `https://rickandmortyapi.com/api/character/?${filterBy}=${filterValue}+${filter}`
          : apiKey;

        const response = await fetch(apiUrl);
        const data = await response.json();

        setCharacterList(data.results);
        setPrevPage(data.info.prev);
        setNextPage(data.info.next);

        const speciesValues = data.results.map(item => item.species);
        const uniqueSpeciesSet = [...new Set(speciesValues)];
        setUniqueSpecies(uniqueSpeciesSet);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [apiKey, location.search, filter]);

  const handleButtonClick = () => {
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
        <button className="button" onClick={() => { setApiKey(prevPage); handleButtonClick(); }}>Prev</button>
      )}

      {nextPage && (
        <button className="button" onClick={() => { setApiKey(nextPage); handleButtonClick(); }}>Next</button>
      )}
    </div>
  );
};

export default FilteredCharactersList;