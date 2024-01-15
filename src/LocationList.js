import React, { useState, useEffect } from 'react';
import './App.css';
import Location from './Location';
import { Link } from 'react-router-dom';

const LocationList = () => {
  const [list, setList] = useState([]);
  const [prev, setPrev] = useState('');
  const [next, setNext] = useState('');
  const [apiKey, setKey] = useState('https://rickandmortyapi.com/api/location/?page=1');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiKey);
        const data = await response.json();

        setList(data.results);
        setPrev(data.info.prev);
        setNext(data.info.next);
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
    <div className="ListPage LocationPage">
      <h2>Locations List</h2>
      <div className="charList">
        {list.map((location) => (
          <Link key={location.id} className="link" to={`/locations/${location.id}`}>
            <Location id={location.id} name={location.name} type={location.type} dimension={location.dimension} />
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

export default LocationList;

