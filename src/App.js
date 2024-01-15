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
import Header from './Header';
import videoSource from './files/video.webm';
import HomeFetch from './HomeFetch';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';


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
            <div className="videowrapper">
              <div id="fullScreenDiv">
                <video src={videoSource}  id="video" role="presentation" preload="auto" crossorigin="anonymous" loop="1"  autoplay="" className="blur" muted playsinline></video>
                <div id="videoMessage" class="styling"> 
                    <h2>[Adult Swim]</h2>
                </div>   
              </div>
            </div>
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