import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CharacterDetails = ({ match }) => {
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
          <Link class='returnBut' to='/characters'>
            <p className='return a verd'><i className={`material-icons`}>arrow_backward</i> All characters  </p>
          </Link>
          <h1>{detail.name}</h1>
          <article id={`character_${detail.id}`}>
            <img className="detailImg" src={detail.image} alt={detail.name} />
            <div className='margin2'>
              <Link className='link returnBut a' to={`/charactersfilt?filter=species&value=${detail.species}`}>
                <h3 className="detailtxt return">Species : {detail.species} <i className={`material-icons`}>arrow_forward</i></h3>
              </Link>
              <Link className='link returnBut a' to={`/charactersfilt?filter=gender&value=${detail.gender}`}>
                <h3 className="detailtxt return">Gender : {detail.gender} <i className={`material-icons`}>arrow_forward</i></h3>
              </Link>
              <h3 className="detailtxt">Status : {detail.status}</h3>
            </div>
            <div>
              <h3>
                <Link className="detailButton load" to={`/locations/${getId(detail.location.url)}`}>
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

export default CharacterDetails;

