import React, { useState, useEffect } from 'react';
import './App.css';
import EpisodesFilter from './EpisodesFilter';
import Episode from './comp/Episode';
import { Link } from 'react-router-dom';

const EpisodesList = () => {
  const [list, setList] = useState([]);
  const [prev, setPrev] = useState('');
  const [next, setNext] = useState('');
  const [apiKey, setKey] = useState('https://rickandmortyapi.com/api/episode/?page=1');

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

  const handleSeasonChange = (season) => {
    if(season === "nothing")
      setKey(`https://rickandmortyapi.com/api/episode/?page=1`);
    else
      setKey(`https://rickandmortyapi.com/api/episode/?episode=${season}`);
    
    
  };

  return (
    <div className="ListPage EpisodePage">
      <h2>Episodes List</h2>
      <div>
        <EpisodesFilter onSeasonChange={handleSeasonChange} />
      </div>
      <div className='charList'>
        {list.map((episode) => (
          <Link key={episode.id} className="link" to={`/episodes/${episode.id}`}>
            <Episode id={episode.id} name={episode.name} characters={episode.characters} date={episode.air_date} />
          </Link>
        ))}
      </div>
      {prev && (
        <button className="button" onClick={() => setKey(prev)}>Prev</button>
      )}

      {next && (
        <button className="button" onClick={() => setKey(next)}>Next</button>
      )}
    </div>
  );
};

export default EpisodesList;
