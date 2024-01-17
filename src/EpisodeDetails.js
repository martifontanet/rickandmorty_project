import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Char_IMG from './comp/Char_IMG';
import portal from './files/portal.png';

const EpisodeDetails = ({ match }) => {
  // Definimos estados para almacenar los datos de la ubicación, filtrar y controlar el estado del fetch
  const [detail, setDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [season, setSeason] = useState('');
  const [episode, setEpisode] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charactersPerPage, setCharactersPerPage] = useState(0);

  const characterListRef = useRef(null); // Referenciamos al contenedor de la lista de personajes

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

  // Funcion que usamos para calcular los personajes visibles cuando cambia el ancho de la ventana
  useEffect(() => {
    const calculateVisibleCharacters = () => {
      const characterListContainer = characterListRef.current;
      if (characterListContainer) {
        // Ajustamos el ancho que queremos que ocupe gracias al calculo del ancho del contenedor
        const charactersPerPage = Math.floor(characterListContainer.offsetWidth / 200);
        setCharactersPerPage(charactersPerPage);
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
  }, [detail.characters]);

  const handlePrev = () => {  // revisamos el anterior numero de la array, y si lo hay ejecutamos
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : detail.characters.length - charactersPerPage));
  };
  
  const handleNext = () => { // revisamos el siguiente numero de la array, y si lo hay ejecutamos
    setCurrentIndex((prevIndex) => (prevIndex < detail.characters.length - charactersPerPage ? prevIndex + 1 : 0));
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
          <div className="detailPage">
          <Link class='returnBut' to='/episodes'>
            <p  className='return a verd'><i className={`material-icons`}>arrow_backward</i> All episodes  </p>
          </Link>
            <div id={`episode_${detail.id}`}>
              <h2 className="detailSpecies">Season {season} - <span className='verd2'>Episode {episode}</span></h2>
              <h1 className='blau'>{detail.name}</h1>
              <p className="detailGender"><span className='verd2'>Release date :</span> {detail.air_date}</p>
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