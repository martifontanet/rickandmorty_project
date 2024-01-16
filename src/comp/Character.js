import React, { Component } from 'react';

class Character extends Component {

  render() {
    return ( //Estructura de renderización de las cartas de personages
      <div className="cardd" id={`player_${this.props.id}`}>
        <div id='chaCa'>
          <img src={this.props.image} alt="charIMG"></img>
          <h3 className="cardH3">{`${this.props.name}`}</h3>
          <p className="cardP">{`${this.props.species}`}</p> 
        </div>
      </div>
    );
  }
}

export default Character;