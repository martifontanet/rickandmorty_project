import React, { useState} from 'react';

const Filter = ({ setFilter }) => {
    const [activeFilter,setFilterButton] = useState([]); // Declaramos un estado para el botón de filtro activo
    // Función para manejar el clic de botón de filtro y asignar las distintas variables
    const clickFilter = (term, buttonId) => { 
        setFilter(term); 
        setFilterButton(buttonId)
      };

  return (
    <>
         <div className='filterBar'>
            <h2>Filter:</h2>
             {/* Botones de filtro con clases condicionales basadas en el botón activo */}
            <button className={`${activeFilter === 1 ? 'filterButtonActive' : 'filterButton'}`} onClick={() => clickFilter("&status=",1)}>All</button>
            <button className={`${activeFilter === 2 ? 'filterButtonActive' : 'filterButton'}`} onClick={() => clickFilter("&status=alive",2)}>Alive</button>
            <button className={`${activeFilter === 3 ? 'filterButtonActive' : 'filterButton'}`} onClick={() => clickFilter("&status=dead",3)}>Dead</button>
            <button className={`${activeFilter === 4 ? 'filterButtonActive' : 'filterButton'}`} onClick={() => clickFilter("&status=unknown",4)}>Unknown</button>
          </div>
    </>
  );
};

export default Filter;

