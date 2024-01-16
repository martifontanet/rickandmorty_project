import React, { Component } from 'react';

// VideoGameCard component
class Character extends Component {

  render() {
    console.log(this.props);
    return (
      <div className="cardd" id={`player_${this.props.id}`}>
        <div id='chaCa'>
          <img src={this.props.image} alt="charIMG"></img>
          <h3 className="cardH3">{`${this.props.name}`}</h3>
          <p className="cardP">{`${this.props.species}`}</p> 
          {/* <h4 className="vgCardName">{`Status : ${this.props.status}`}</h4>*/}
        </div>
      </div>
    );
  }
}

export default Character;