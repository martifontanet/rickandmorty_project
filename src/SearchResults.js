import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import Character from './comp/Character';
import Location from './comp/Location';
import Episode from './comp/Episode';
import Filter from './comp/Filter';
const SearchResults = ({match}) => {
  //const { searchTerm, topic } = useParams();
  const [list, setList] = useState([]);
  const topic = match.params.topic;
  const searchTerm = match.params.searchTerm;
  const [filter, setFilter] = useState([]);
  const [status, setStatus] = useState([]);
  let filtro1 = [];
  
  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/${topic}/?name=${searchTerm+filter}`);
        const data = await response.json();
        setList(data.results);

        const uniqueStatus = data.results.map(item => item.status);

        // Count unique species values using Set
        const status = [...new Set(uniqueStatus)];
        setStatus(status);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSearch();
  }, [topic, searchTerm,filter]);
  const handleTermChange = (event) => {
    filtro1 = status;
    setFilter(event.target.value);
  };

  return (
    <div className="ListPage SearchPage">
      <h2>Search term: <strong>{searchTerm}</strong></h2>
      <div>
        {topic === 'character' && (
          <Filter setFilter = {setFilter} />
          )}
      {/* {topic === 'character' && (
          <select value={filter} onChange={handleTermChange}>
            {filtro1.map((species, index) => (
              <option key={index} value={`&status=${species}`}>{species}</option>
            ))}

           ESTO ESTA A MEDIAS, PARA PONER AUTOMATICO LOS FILTROS
            <option value="">All</option>
            <option value="&status=alive">Alive</option>
            <option value="&status=dead">Dead</option>
            <option value="&status=unknown">Unknown</option>
          </select>
        )}  */}
        <div className="characterList">
        
        {topic === 'character'? (
          list.map(character => (
            <Link key={character.id} className="linkChar" to={`/character/${character.id}`} keyword={searchTerm}>
               <Character id={character.id} name={character.name} image={character.image} status={character.status} species={character.species} />
            </Link>
          ))
        ) : topic === 'location'? (
          list.map((location) => (
            <Link key={location.id} className="link" to={`/locations/${location.id}`}>
              <Location id={location.id} name={location.name} type={location.type} dimension={location.dimension} />
            </Link>
          ))
        ) : (
          list.map((episode) => (
            <Link key={episode.id} className="link" to={`/episode/${episode.id}`}>
              <Episode id={episode.id} name={episode.name} characters={episode.characters} date={episode.created} />
            </Link>
          ))
        )}
          
        </div>
      </div>
    </div>
  );
};

export default SearchResults;

