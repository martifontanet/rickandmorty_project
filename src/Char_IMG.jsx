import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Char_IMG = ({character}) => {
  const [Char_Info, setInfo] = useState([]);
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
            <div className="card card3" id={`player_${Char_Info.id}`}>
              <img src={Char_Info.image} alt="charIMG"></img>
              <h2 className="cardH3">{`${Char_Info.name}`}</h2>
            </div>
        </Link>
      )}
        
        
    </div>
  );
};

export default Char_IMG;

