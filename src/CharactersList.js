import React, { useState, useEffect } from 'react';
import './App.css';
import Character from './comp/Character';
import Filter from './comp/Filter';
import { Link } from 'react-router-dom';

const CharactersList = () => {
  const [fullist, setList] = useState([]);
  const [prev, setPrev] = useState(''); //botones de paginacion
  const [next, setNext] = useState('');
  const [filter, setFilter] = useState([]);
  const [apiKey, setKey] = useState(`https://rickandmortyapi.com/api/character/?page=1`);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiKey+filter);
        const data = await response.json();

        setList(data.results); // guardamos los datos de la lista
        setPrev(data.info.prev); // guardamos los enlaces de las siguientes o anteriores paginas si las hay
        setNext(data.info.next);

      } catch (err) {
        console.error(err);
      }

    };

    fetchData();
  }, [apiKey,filter]);

  const handleButtonClick = () => { // Al pasar de pagina subimos arriba de la pagina
    window.scrollTo({ top: 5, behavior: 'smooth' });
  };

  return (
    <div className="ListPage CharacterPage">
      <h2>Characters List</h2>
      <Filter setFilter = {setFilter} />
      <div className='characterList'>
        {fullist.map((character) => (
          <Link key={character.id} className="linkChar" to={`/character/${character.id}`}>
            <Character id={character.id} name={character.name} image={character.image} status={character.status} species={character.species} />
          </Link>
        ))}
      </div>
      {/** Botones de paginación */}
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