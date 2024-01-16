import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Char_IMG = ({ character }) => {
  const [Char_Info, setInfo] = useState(null); // variable donde guardaremos los datos del fetch
  const [isLoading, setIsLoading] = useState(true); // variable donde comprobaremos si el fetch ha terminado

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizamos un fetch para obtener los datos de los distintos personajes
        const response = await fetch(character);
        const data = await response.json();

        setInfo(data); 
        setIsLoading(false); // Guardamos la info y en cuanto acaba ponemos la variable isLoading en false para poder imprimir todo el codigo
      } catch (err) {
        console.error(err);
        setIsLoading(false); //En caso de error también paramos el bucle
      }
    };

    fetchData();
  }, [character]);

  return (
    <div id="">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        // Linkeamos la targeta con la info suficiente para ir a los detalles 
        <Link className="link" to={`/character/${Char_Info.id}`}> 
          <div className="cardd" id={`player_${Char_Info.id}`}>
            <div id="chaCa">
              <img src={Char_Info.image} alt="charIMG"></img>
              <h3 className="cardH3">{`${Char_Info.name}`}</h3>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Char_IMG;