import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Char_IMG from './Char_IMG';

const LocationDetails = ({ match }) => {
  const [locationData, setLocationData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
        <div className='detailPage'>
          <h1>{locationData.name}</h1>
          <article id={`location_${locationData.id}`}>
            <div>
              <h3 className="detailSpecies">Type: {locationData.type}</h3>
              <h3 className="detailLocation">Dimension: {locationData.dimension}</h3>
              <h3 className="detailButton">Residents</h3>
              <div className="charList">
                {locationData.residents.length === 0 ? (
                  <p className='error'>NO RESIDENTS</p>
                ) : (
                  locationData.residents.map((character) => (
                    <Link className="link" to={`/character/${character.charAt(character.length - 1)}`} key={character.id}>
                      <Char_IMG character={character} />
                    </Link>
                  ))
                )}

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
