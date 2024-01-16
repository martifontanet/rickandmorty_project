import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Char_IMG from './comp/Char_IMG';

const EpisodeDetails = ({ match }) => {
  const [detail, setDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [season, setSeason] = useState('');
  const [episode, setEpisode] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charactersPerPage, setCharactersPerPage] = useState(0);

  const characterListRef = useRef(null);

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
  }, [match.params.episode_Id]);

  useEffect(() => {
    const calculateVisibleCharacters = () => {
      const characterListContainer = characterListRef.current;
      if (characterListContainer) {
        const charactersPerPage = Math.floor(characterListContainer.offsetWidth / 200); // Ajusta el ancho según tus necesidades
        setCharactersPerPage(charactersPerPage);
        setCurrentIndex((prevIndex) => (prevIndex % charactersPerPage));
      }
    };

    window.addEventListener('resize', calculateVisibleCharacters);

    calculateVisibleCharacters(); // Llama a la función inicialmente

    return () => {
      window.removeEventListener('resize', calculateVisibleCharacters);
    };
  }, [detail.characters]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : detail.characters.length - charactersPerPage));
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < detail.characters.length - charactersPerPage ? prevIndex + 1 : 0));
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="detailPage">
            <div id={`episode_${detail.id}`}>
              <h2 className="detailSpecies">Season {season} - Episode {episode}</h2>
              <h1>{detail.name}</h1>
              <p className="detailGender">Release date : {detail.air_date}</p>
              <p className="detailButton">Characters featured</p>
              <div className="characterList" ref={characterListRef}>
                <button className='button-33' onClick={handlePrev} disabled={currentIndex === 0}>&lt;</button>
                {detail.characters.slice(currentIndex, currentIndex + charactersPerPage).map((character, index) => (
                  <Link className="linkChar" to={`/character/${character.charAt(character.length - 1)}`} key={index}>
                    <Char_IMG character={character} />
                  </Link>
                ))}
                <button className='button-33' onClick={handleNext} disabled={currentIndex >= detail.characters.length - charactersPerPage}>&gt;</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EpisodeDetails;