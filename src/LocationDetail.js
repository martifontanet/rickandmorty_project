import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Char_IMG from './comp/Char_IMG';

const LocationDetails = ({ match }) => {
  const [locationData, setLocationData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const charactersPerPage = 4; // Ajusta el número de personajes por página según tus necesidades

  const characterListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/location/${match.params.location_Id}`);
        const data = await response.json();

        setLocationData(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [match.params.location_Id]);

  useEffect(() => {
    const calculateVisibleCharacters = () => {
      const characterListContainer = characterListRef.current;
      if (characterListContainer) {
        const containerWidth = characterListContainer.offsetWidth;
        const charactersPerPage = Math.floor(containerWidth / 200); // Ajusta el ancho según tus necesidades
        setCurrentIndex((prevIndex) => (prevIndex % charactersPerPage));
      }
    };

    window.addEventListener('resize', calculateVisibleCharacters);

    calculateVisibleCharacters(); // Llama a la función inicialmente

    return () => {
      window.removeEventListener('resize', calculateVisibleCharacters);
    };
  }, [locationData.residents]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : locationData.residents.length - charactersPerPage));
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < locationData.residents.length - charactersPerPage ? prevIndex + 1 : 0));
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
        <div className='detailPage'>
          <Link class='returnBut' to='/locations'>
            <p  className='return a verd'><i className={`material-icons`}>arrow_backward</i> All locations  </p>
          </Link>
          <h1 className='blau'>{locationData.name}</h1>
          <article id={`location_${locationData.id}`}>
            <div>
              <h3 className="detailSpecies">Type: {locationData.type}</h3>
              <h3 className="detailLocation">Dimension: {locationData.dimension}</h3>
              <h3 className="detailButton">Residents</h3>
              <div className="characterList" ref={characterListRef}>
                <button className='button-33' onClick={handlePrev} disabled={currentIndex === 0}>&lt;</button>
                {locationData.residents.length === 0 ? (
                  <p className='error'>NO RESIDENTS</p>
                ) : (
                  locationData.residents.slice(currentIndex, currentIndex + charactersPerPage).map((character) => (
                    <Link className="linkChar" to={`/character/${character.charAt(character.length - 1)}`} key={character.id}>
                      <Char_IMG character={character} />
                    </Link>
                  ))
                )}
                <button className='button-33' onClick={handleNext} disabled={currentIndex >= locationData.residents.length - charactersPerPage}>&gt;</button>
              </div>
            </div>
          </article>
        </div>
        </>
      )}
    </>
  );
};

export default LocationDetails;