import './App.css';
import Home from './components/HomePage/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotSongs from './components/HotSongs/HotSongs';
import Playlists from './components/Playlists/Playlists';
import Artists from './components/Artists/Artists';
import ShowAll from './components/Artists/ShowAll';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/hotsongs' element={<HotSongs/>}/>
          <Route path='/playlists' element={<Playlists/>} />
          <Route path='/artists' element={<Artists/>} />
          <Route path='/artists/allartists' element={<ShowAll/>}/>
          <Route path='/artists/allartists/:genre' element={<ShowAll/>}/>
          <Route path='/artists/allartists/:market' element={<ShowAll/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
