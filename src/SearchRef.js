import React, { Component } from 'react';
import './App.css';
import {
  Link,
} from 'react-router-dom';
import GameCard from './GameCard';
import Search from './Search';

class VideogamesList extends Component {
  constructor(props) {
      super(props);
      this.apiKey = '806d407e7b9b48e896391842831f2637';
      this.state = {
          list: [],
      }
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    this.fetchAll();

  }

  fetchAll(){
    fetch(`https://api.rawg.io/api/games?key=${this.apiKey}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // SUPER-IMPORTANT: When you change the state
      // of a component, you have to call "setState", otherwise
      // React cannot know about your changes.
      this.setState({
          list : data.results 
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  fetchSearch(){
    fetch(`https://api.rawg.io/api/games?key=${this.apiKey}&search=${this.state.value}&search_exact=true`)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
      // SUPER-IMPORTANT: When you change the state
      // of a component, you have to call "setState", otherwise
      // React cannot know about your changes.
      this.setState({
          list : data.results 
      });
      
    })
    .catch((err) => {
      console.error(err);
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.fetchSearch();
  }

  handleChangeState = (content) => {
    this.setState({list: content})
  }

  render() {
    return (
      <div>
        <h1><Link class="linkHeader" to="/" >Home page</Link></h1>
        <h1>Game Hub</h1>
        <Search state = {this.state.list} handleChangeState = {this.handleChangeState} />

        <div id="GameContainer">
          <div id="vglist">
          {
          this.state.list.map(game => (
            
              <Link class="link" to={`/game/${game.id}`}>
                <GameCard
                    key={game.id}
                    id={game.id}
                    name={game.name}
                    releaseDate={game.released}
                    backgroundImage={game.background_image}
                  />
            </Link>
            
          ))}
          </div>
        </div>
        
        
        
      </div>
      
    );
  }
}

export default VideogamesList;
