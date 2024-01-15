import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GameDetails = ({ match }) => {
  const [detail, setDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${match.params.char_Id}`);
        const data = await response.json();
        setDetail(data);
        setIsLoading(false); // Use the data directly instead of detail
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchCharacterDetail();
  }, [match.params.char_Id]);

  const getId = (url) => {
    // Dividimos la URL por las barras "/"
    const parts = url.split('/');
    // Eliminamos el último elemento (que debería ser una cadena vacía o el último segmento de la URL)
    const lastPart = parts.pop();
    
    return lastPart;
  };

  return (
    <>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
        <div className='detailPage'>
          <h1>{detail.name}</h1>
          <article id={`character_${detail.id}`}>
            <img className="detailImg" src={detail.image} alt={detail.name} />
            <div>
              <h3 className="detailSpecies">Species : {detail.species}</h3>
              <h3 className="detailGender">Gender : {detail.gender}</h3>
              <h3 className="detailStatus">Status : {detail.status}</h3>
              <h3>
                <Link className="detailButton" to={`/locations/${getId(detail.location.url)}`}>
                <span>&#128205;</span> {detail.location.name}
                </Link>
              </h3>
            </div>
          </article>
        </div>
        </>
      )}
    </>
  );
};

export default GameDetails;

