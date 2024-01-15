import React from 'react';

const EpisodesFilter = ({ onSeasonChange }) => {

  const handleSeasonChange = (e) => {
    const season = e.target.value;
    onSeasonChange(season); // Llamando al callback para enviar el valor de la temporada seleccionada
  };

  return (
    <div className="epfilter">
      <label htmlFor="seasons">Choose a season:</label>
      <select name="cars" id="seasons" className='button shortButton' onChange={handleSeasonChange}>
        <option value="nothing"></option>
        <option id="s01" value="s01">Season 1</option>
        <option id="s02" value="s02">Season 2</option>
        <option id="s03" value="s03">Season 3</option>
        <option id="s04" value="s04">Season 4</option>
        <option id="s05" value="s05">Season 5</option>
      </select>
    </div>
  );
};

export default EpisodesFilter;
