import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Char_IMG from './comp/Char_IMG';
import portal from './files/portal.png';

const LocationDetails = ({ match }) => {
  // Definimos estados para almacenar los datos de la ubicación y controlar el estado del fetch
  const [locationData, setLocationData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const charactersPerPage = 4;  

  const characterListRef = useRef(null); // Referenciamos al contenedor de la lista de personajes

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

  // Funcion que usamos para calcular los personajes visibles cuando cambia el ancho de la ventana
  useEffect(() => {
    const calculateVisibleCharacters = () => {
      const characterListContainer = characterListRef.current;
      if (characterListContainer) {
        const containerWidth = characterListContainer.offsetWidth;
        // Ajustamos el ancho que queremos que ocupe gracias al calculo del ancho del contenedor
        const charactersPerPage = Math.floor(containerWidth / 200); 
        setCurrentIndex((prevIndex) => (prevIndex % charactersPerPage));
      }
    };
    //Añadimos un listener a las dimensiones de la ventana
    window.addEventListener('resize', calculateVisibleCharacters);

    calculateVisibleCharacters();

    return () => {
      //Lo quitamos al desmontar
      window.removeEventListener('resize', calculateVisibleCharacters);
    };
  }, [locationData.residents]);

  const handlePrev = () => { // revisamos el anterior numero de la array, y si lo hay ejecutamos
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : locationData.residents.length - charactersPerPage));
  };
  
  const handleNext = () => { // revisamos el siguiente numero de la array, y si lo hay ejecutamos
    setCurrentIndex((prevIndex) => (prevIndex < locationData.residents.length - charactersPerPage ? prevIndex + 1 : 0));
  };

  return (
    <>
      {isLoading ? (
        <div> {/* Si esta cargando mostramos una pequeña animación */}
          <img className='App-logo' src={portal} alt='portal'></img>
          <p className='loading verd'>Loading...</p>
        </div>
      ) : (
        <>
        <div className='detailPage'>
          <Link class='returnBut' to='/locations'>
            <p  className='return a verd'><i className={`material-icons`}>arrow_backward</i> All locations  </p>
          </Link>
          <h1 className='blau'>{locationData.name}</h1>
          <article id={`location_${locationData.id}`}>
            <div>
              <h3 className="detailSpecies"><span className='verd2'>Type:</span> {locationData.type}</h3>
              <h3 className="detailLocation"><span className='verd2'>Dimension:</span> {locationData.dimension}</h3>
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