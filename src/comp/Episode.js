import React, { Component } from 'react';

// VideoGameCard component
class Character extends Component {

  render() {
    return ( //Estructura de renderización de las cartas de episodios
      <div className='card' id={`player_${this.props.id}`}>
        <div>
          <h3 className='cardH3'>{`${this.props.name}`}</h3>
          <p className='cardP'>{`${this.props.date}`}</p>
        </div>
      </div>
    );
  }
}

export default Character;
