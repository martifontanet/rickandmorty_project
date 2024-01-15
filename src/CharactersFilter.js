import React, { useState, useEffect } from 'react';

const EpisodesFilter = ({ onSeasonChange }) => {

  const handleSeasonChange = (e) => {
    const season = e.target.value;
    onSeasonChange(season); // Llamando al callback para enviar el valor de la temporada seleccionada
  };

  return (
    <div className="epfilter">
      <label htmlFor="cars">Choose a Status:</label>
      <select name="cars" id="cars" onChange={handleSeasonChange}>
        <option value="nothing"></option>
        <option id="s01" value="s01">Alive</option>
        <option id="s02" value="s02">Dead</option>
        <option id="s03" value="s03">unknown</option>
      </select>
      <label htmlFor="cars"> Choose a Species:</label>
      <select name="cars" id="cars" onChange={handleSeasonChange}>
        <option value="nothing"></option>
        <option id="s01" value="s01">Alive</option>
        <option id="s02" value="s02">Dead</option>
        <option id="s03" value="s03">unknown</option>
      </select>
    </div>
  );
};

export default EpisodesFilter;