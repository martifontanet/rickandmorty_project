import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import CharactersList from './CharactersList';
import CharacterDetails from './CharacterDetails';
import EpisodesList from './EpisodesList';
import EpisodeDetails from './EpisodeDetails';
import LocationList from './LocationList';
import LocationDetail from './LocationDetail';
import SearchResults from './SearchResults';
import './App.css';
import Header from './comp/Header';
import HomeFetch from './HomeFetch';
import Footer from './comp/Footer';
import ScrollToTop from './comp/ScrollToTop';


function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  
    const handleScroll = () => {
      const header = document.getElementById('header');
      const content = document.getElementById('content');
      const sticky = header.offsetTop;
  
      if (window.scrollY > sticky) {
        header.classList.add('fixed');
        content.classList.add('fixed');
      } else {
        header.classList.remove('fixed');
        content.classList.remove('fixed');
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Router>
      <div id="mainContainer">
        <ScrollToTop />
        <div id="header">
          <Header />
        </div>
        <div id="content">
          <body>
            <Switch>
              <Route exact path="/characters" component={CharactersList} />
              <Route path="/character/:char_Id" component = {CharacterDetails}/>
              <Route exact path="/episodes" component={EpisodesList} />
              <Route path="/episodes/:episode_Id" component={EpisodeDetails}/>
              <Route exact path="/locations" component={LocationList}/>
              <Route path="/locations/:location_Id" component={LocationDetail}/>
              <Route path="/searchResult/:topic/:searchTerm" component={SearchResults}/>

              <Route exact path="/" render={() => <HomeFetch />} />
            </Switch>
          </body>
        <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;