import React from 'react';
import './Playlists.css';
import PlaySongs from './PlaySongs';
import PlaylistsInfo from './PlaylistsInfo';
import playlistBackground from '../Images/playlist_background.jpg';

const Playlists = () => {
  return (
    <>
    <div className='playlists-container'>
      <img className='playlist-background' src={playlistBackground} alt='playlist-background' />
      <div className='playlist-content'>
      <PlaySongs/>
      <PlaylistsInfo/>
      </div>
    </div>
    </>
  )
}

export default Playlists