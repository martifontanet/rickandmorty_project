import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import portal from './files/portal.png';

const CharacterDetails = ({ match }) => { //recuperamos la variable
  const [charId, setCharId] = useState(match.params.char_Id);
  const [detail, setDetail] = useState({}); // array de estado para el fetch
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${charId}`);
        const data = await response.json();
        setDetail(data);
        setIsLoading(false); // Use the data directly instead of detail
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchCharacterDetail();
  }, [charId]);

  const getId = (url) => { //Conseguimos la Id de la localizacion desde la url que nos proporciona la api
    // Dividimos la URL por las barras "/"
    const parts = url.split('/');
    // Eliminamos el último elemento, que debería ser una cadena vacía o el último segmento de la URL
    const lastPart = parts.pop();
    
    return lastPart;
  };

  const handlePrev = () => {
    const prevCharacterId = parseInt(charId, 10) - 1;
    setCharId(prevCharacterId.toString());
    history.push(`/character/${prevCharacterId}`);
    
  };

  const handleNext = () => {
    const nextCharacterId = parseInt(charId, 10) + 1;
    setCharId(nextCharacterId.toString());
    history.push(`/character/${nextCharacterId}`);
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
          <Link class='returnBut' to='/characters'>
            <p className='return a verd'><i className={`material-icons`}>arrow_backward</i> All characters  </p>
          </Link>
          <div className='detailCharPage'>
            <div className='left'>
              <button className='button-33' onClick={handlePrev}>&lt;</button>
            </div>
            <div>
              <h1>{detail.name}</h1>
              <article id={`character_${detail.id}`}>
                <img className="detailImg" src={detail.image} alt={detail.name} />
                <div className='margin2'>
                  <Link className='link returnBut a' to={`/charactersfilt?filter=species&value=${detail.species}`}>
                    <h3 className="detailtxt return"><span className='verd2'>Species :</span> {detail.species} <i className={`material-icons`}>arrow_forward</i></h3>
                  </Link>
                  <Link className='link returnBut a' to={`/charactersfilt?filter=gender&value=${detail.gender}`}>
                    <h3 className="detailtxt return"><span className='verd2'>Gender :</span> {detail.gender} <i className={`material-icons`}>arrow_forward</i></h3>
                  </Link>
                  <h3 className="detailtxt"><span className='verd2'>Status :</span> {detail.status}</h3>
                </div>
                <div>
                  <h3>
                    <Link className="detailButton load" to={`/location/${getId(detail.location.url)}`}>
                    <span>&#128205;</span> {detail.location.name}
                    </Link>
                  </h3>
                </div>
              </article>
            </div>
            <div className='left'>
            <button className='button-33' onClick={handleNext}>&gt;</button>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default CharacterDetails;

