import React, { useState, useEffect } from 'react';
import './App.css';
import Character from './Character';
import { Link } from 'react-router-dom';

const CharactersList = () => {
  const [fullist, setList] = useState([]);
  const [prev, setPrev] = useState('');
  const [next, setNext] = useState('');
  const [apiKey, setKey] = useState('https://rickandmortyapi.com/api/character/?page=1');
  const [uniqueSpecies, setUniqueSpecies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiKey);
        const data = await response.json();

        setList(data.results);
        setPrev(data.info.prev);
        setNext(data.info.next);
        
        // Extract species values using map
        const speciesValues = data.results.map(item => item.species);

        // Count unique species values using Set
        const uniqueSpeciesSet = [...new Set(speciesValues)];
        setUniqueSpecies(uniqueSpeciesSet);

      } catch (err) {
        console.error(err);
      }

    };

    fetchData();
  }, [apiKey]);

  const handleButtonClick = () => {
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="ListPage CharacterPage">
      {/* <div id="speciesList">
        <h2>Unique Species:</h2>
        {uniqueSpecies.map((species, index) => (
          <p key={index}>{species}</p>
        ))}
      </div> */}
      <h2>Characters List</h2>
      <div className='charList'>
        {fullist.map((character) => (
          <Link key={character.id} className="link" to={`/character/${character.id}`}>
            <Character id={character.id} name={character.name} image={character.image} status={character.status} species={character.species} />
          </Link>
        ))}
      </div>
      
      {prev && (
        <button className="button" onClick={() => { setKey(prev); handleButtonClick(); }}>Prev</button>
      )}

      {next && (
        <button className="button" onClick={() => { setKey(next); handleButtonClick(); }}>Next</button>
      )}
    </div>
  );
};

export default CharactersList;