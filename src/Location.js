import React, { Component } from 'react';

// VideoGameCard component
class Location extends Component {

  render() {
    console.log(this.props);
    return (
      <div className='card' id={`player_${this.props.id}`}>
        <div>
          <h3 className='cardH3'>{`${this.props.name}`}</h3>
          <p className='cardP'>{`${this.props.type}`}</p>
        </div>
      </div>
    );
  }
}

export default Location;
