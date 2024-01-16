import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Char_IMG = ({ character }) => {
  const [Char_Info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(character);
        const data = await response.json();

        setInfo(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [character]);

  return (
    <div id="">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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