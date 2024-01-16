import Char_IMG from './comp/Char_IMG';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GameDetails = ({ match }) => {
  const [detail, setDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [season, setSeason] = useState('');
  const [episode, setEpisode] = useState('');

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/episode/${match.params.episode_Id}`);
        const data = await response.json();

        setDetail(data);
        
        let season = data.episode.substring(2, 3);
        let episode = data.episode.substring(4, 7);
        setSeason(season);
        setEpisode(episode);
        setIsLoading(false);

      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchCharacterDetail();
  }, [match.params.char_Id]);

  return (
    <>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
        <div className='detailPage'>
          <div id={`episode_${detail.id}`}>
              <h2 className='detailSpecies'>Season {season} - Episode {episode}</h2>
              <h1>{detail.name}</h1>
              <p className='detailGender'>Release date : {detail.air_date}</p>
                <p className='detailButton'>Characters featured</p>
              <h3 className='detailEpisodes'>
              <div className='charList charList3'>
                {detail.characters.map((character) => (
                  <Link className='link' to={`/character/${character.charAt(character.length - 1)}`} key={character.id}>
                    <Char_IMG character={character} />
                  </Link>
                ))}
              </div>
              </h3>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default GameDetails;

