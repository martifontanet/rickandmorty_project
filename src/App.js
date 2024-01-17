import React, { useEffect } from 'react';
import { //Importamos librerías
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
// Importamos todos los componentes necesarios para hacer diseñar las rutas de la aplicación
import CharactersList from './CharactersList'; 
import CharacterDetails from './CharacterDetails';
import EpisodesList from './EpisodesList';
import EpisodeDetails from './EpisodeDetails';
import LocationList from './LocationList';
import LocationDetail from './LocationDetail';
import SearchResults from './SearchResults';
import Header from './comp/Header';
import HomeFetch from './HomeFetch';
import Footer from './comp/Footer';
import ScrollToTop from './comp/ScrollToTop';
import filterCharacter from './FilterCharacterList'
import './App.css';


function App() {
  useEffect(() => { // Utilizamos useEffect para manejar el evento de scroll y conseguir el encabezado fijado
    window.scrollTo(0, 0);
  
    const handleScroll = () => {
      const header = document.getElementById('header');
      const content = document.getElementById('content');
      const sticky = header.offsetTop;
  
       // Verificar si la altura total de la página es menor que la altura de la ventana
       const isSmallPage = document.body.scrollHeight <= window.innerHeight;

       if (!isSmallPage) {
         if (window.scrollY > sticky) {
           header.classList.add('fixed');
           content.classList.add('fixed');
         } else {
           header.classList.remove('fixed');
           content.classList.remove('fixed');
         }
       }
     };
  
    window.addEventListener('scroll', handleScroll);
      // Desregistramos el evento de scroll cuando al desmontar el componente
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
            <Switch> {/* Definimos todas las rutas de la app */}
              <Route exact path="/characters" component={CharactersList} />
              <Route path="/character/:char_Id" component = {CharacterDetails}/>
              <Route exact path="/episodes" component={EpisodesList} />
              <Route path="/episode/:episode_Id" component={EpisodeDetails}/>
              <Route exact path="/locations" component={LocationList}/>
              <Route path="/location/:location_Id" component={LocationDetail}/>
              <Route path="/searchResult/:topic/:searchTerm" component={SearchResults}/>
              <Route path="/charactersfilt" component={filterCharacter} />
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