import React, { useState, useEffect } from 'react';
import './App.css';
import Character from './comp/Character';
import Location from './comp/Location';
import Episode from './comp/Episode';
import videoSource from './files/video.webm';
import { Link } from 'react-router-dom';

const HomeFetch = () => {
  const [list1, setList1] = useState([]); // variable1 donde guardaremos los datos del fetch
  const [list2, setList2] = useState([]); // variable2 donde guardaremos los datos del fetch
  const [list3, setList3] = useState([]); // variable3 donde guardaremos los datos del fetch

  const generateRandomNumbers = (min, max, count) => {
    const numbers = [];
    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return numbers;
  };

  //Generamos los 4 numeros aleatorios para cada categoria, y cada una tiene su rango
  const randChars = generateRandomNumbers(1, 826, 4);
  const randLocs = generateRandomNumbers(1, 125, 4);
  const randEpis = generateRandomNumbers(1, 51, 4);

   // Construimos las URLs de la API según los valores generados
  const [apiKey1, setKey1] = useState(`https://rickandmortyapi.com/api/character/[${randChars[0]},${randChars[1]},${randChars[2]},${randChars[3]}]`);
  const [apiKey2, setKey2] = useState(`https://rickandmortyapi.com/api/location/[${randLocs[0]},${randLocs[1]},${randLocs[2]},${randLocs[3]}]`);
  const [apiKey3, setKey3] = useState(`https://rickandmortyapi.com/api/episode/[${randEpis[0]},${randEpis[1]},${randEpis[2]},${randEpis[3]}]`);
  
  
  useEffect(() => { //Ejecutamos los tres fetch pertenientes
    const fetchData1 = async () => {
      try {
        const response = await fetch(apiKey1);
        const data = await response.json();

        setList1(data);

      } catch (err) {
        console.error(err);
      }
    };
    const fetchData2 = async () => {
        try {
          const response = await fetch(apiKey2);
          const data = await response.json();
  
          setList2(data);
  
        } catch (err) {
          console.error(err);
        }
      };
      const fetchData3 = async () => {
        try {
          const response = await fetch(apiKey3);
          const data = await response.json();
  
          setList3(data);
  
        } catch (err) {
          console.error(err);
        }
      };

    fetchData1(); //Los llamamos
    fetchData2();
    fetchData3();
  }, [apiKey1,apiKey2,apiKey3]);

  return (
    <div id='ListHome'>
      <div className="videowrapper"> {/* Incrustamos el video dentro de un div y le añadimos un texto por encima con css */}
        <div id="fullScreenDiv">
          <video src={videoSource}  id="video" role="presentation" preload="auto" crossorigin="anonymous" loop="1"  autoplay="" className="blur" muted playsinline></video>
          <div id="videoMessage" class="styling"> 
              <h2>[Adult Swim]</h2>
          </div>   
        </div>
      </div>
      <div className='margin'>
        <div id='charListHome'>
            <h2>Characters</h2> {/* Renderizamos las distintas categorias con un boton debajo para ir a sus respectivas paginas */}
            <div className='characterList'>
                {list1.map((character) => (
                <Link key={character.id} className='linkChar' to={`/character/${character.id}`}>
                    <Character id={character.id} name={character.name} image={character.image} status={character.status} species={character.species} />
                </Link>
                ))}
            </div>
            <Link to='/characters'>
              <button class='button load t'><span>Load More</span></button>
            </Link>
          </div>
          <div id='locListHome'>
              <h2>Locations</h2>
              <div className='characterList'>
                  {list2.map((location) => (
                      <Link key={location.id} className='link' to={`/location/${location.id}`}>
                          <Location id={location.id} name={location.name} type={location.type} dimension={location.dimension} />
                      </Link>
                  ))}
              </div>
              <Link to='/locations'>
                <button class='button load t'>Load More</button>
              </Link>
          </div>
          <div id='epiListHome'>
              <h2>Episodes</h2>
              <div className='characterList'>
                  {list3.map((episode) => (
                      <Link key={episode.id} className='link' to={`/episode/${episode.id}`}>
                          <Episode id={episode.id} name={episode.name} characters={episode.characters} date={episode.air_date} />
                      </Link>
                  ))}
              </div>
              <Link to='/episodes'>
                <button className='button load t'>Load More</button>
              </Link>
          </div>
        </div>
      </div>
      
  );
};

export default HomeFetch;