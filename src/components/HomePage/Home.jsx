import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import homeBackground from "../Images/music_background.png";
import avatarImage from '../Images/avatar.png';
import './Home.css';

const Home = () => {

  return (
    <>
      <div className="home-page">
        <div className="home">
          <img className="home-background" src={homeBackground} alt="home-background" />

          <div className="image-text">
            <p className="music-player-name">PlayMus.</p>
            <p className="music-player-title">"Music Nourishes Emotions"</p>
          </div>

          
          <div className="navbar justify-content-end navbar-zone">
            <ul className="nav navbar-container">
              <li className="nav-item nav-underline">
                <a className="nav-link" href="hotsongs">
                  Hot Songs
                </a>
              </li>
              <li className="nav-seperator-line"></li>
              <li className="nav-item nav-underline">
                <a className="nav-link" href="playlists">
                  Playlists
                </a>
              </li>
              <li className="nav-seperator-line"></li>
              <li className="nav-item nav-underline">
                <a className="nav-link" href="artists">
                  Artists
                </a>
              </li>
              </ul>
            </div>
            
            <div className="avatar-container">
              <img className="avatar-image" src={avatarImage} alt='avatar'/>
              
              <div className="dropdown-container">
                <a className="dropdown-item" href="/login">Login</a>
                <a className="dropdown-item" href="/signup">Sign Up</a>
              </div>
              
            </div>
          </div>
                    
        </div>
    </>
  );
};

export default Home;
