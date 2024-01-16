import React, { useState} from 'react';

const Filter = ({ setFilter }) => {
    const [activeFilter,setFilterButton] = useState([]);
    const clickFilter = (term, buttonId) => {
        setFilter(term);
        setFilterButton(buttonId)
      };

  return (
    <>
         <div className='filterBar'>
            <h2>Filter:</h2>
            <button className={`${activeFilter === 1 ? 'filterButtonActive' : 'filterButton'}`} onClick={() => clickFilter("&status=",1)}>All</button>
            <button className={`${activeFilter === 2 ? 'filterButtonActive' : 'filterButton'}`} onClick={() => clickFilter("&status=alive",2)}>Alive</button>
            <button className={`${activeFilter === 3 ? 'filterButtonActive' : 'filterButton'}`} onClick={() => clickFilter("&status=dead",3)}>Dead</button>
            <button className={`${activeFilter === 4 ? 'filterButtonActive' : 'filterButton'}`} onClick={() => clickFilter("&status=unknown",4)}>Unknown</button>
          </div>
    </>
  );
};

export default Filter;

