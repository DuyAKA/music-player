import React, { useState } from 'react';
import './PlaySongs.css';
import aloneMarshmello from '../Images/alone_marshmello.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat, faStepBackward, faStepForward, faPause, faPlay, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const PlaySongs = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0); 
  const [showVolumeSlider, setShowVolumeSlider] = useState(false); 
  const [time, setTime] = useState(0);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setVolume(isPlaying ? 0 : 100); 
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value)
  }

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };

  return (
    <>
      <div className='playsongs-container'>
        <div className='playsongs'>
          <div className='playsongs-inside'>
            <div className='song-image-container'>
              <img className='song-image' src={aloneMarshmello} alt='alone' />
            </div>

            <div className='song-name-container'>
              <h4 className='song-name'>Alone</h4>
            </div>

            <div className='song-artist-container'>
              <p className='song-artist'>Marshmello</p>
            </div>

            <div className='playsongs-bar-container'>
              <div className='icon-container'>
                <FontAwesomeIcon className='repeat-icon' icon={faRepeat} />
              </div>

              <div className='icon-container'>
                <FontAwesomeIcon className='previous-icon' icon={faStepBackward} />
              </div>

              <div className='icon-container'>
                <FontAwesomeIcon 
                  className='playpause-icon' 
                  icon={isPlaying ? faPause : faPlay} 
                  onClick={togglePlayPause} 
                />
              </div>

              <div className='icon-container'>
                <FontAwesomeIcon className='next-icon' icon={faStepForward} />
              </div>

              <div className='icon-container'>
                <div className='volume-container'>
                  <FontAwesomeIcon 
                    className='volume-icon' 
                    icon={faVolumeUp} 
                    onClick={toggleVolumeSlider}
                  />
                  {showVolumeSlider && (
                    <input 
                      type='range' 
                      className='volume-slider' 
                      min='0' 
                      max='100' 
                      value={volume} 
                      onChange={handleVolumeChange} 
                    />
                  )}
                </div>
              </div>
            </div>  

            <div className='song-time-container'>
              <span className='song-time'>0:00</span>
              <input 
                      type='range' 
                      className='time-slider' 
                      min='0' 
                      max='100' 
                      value={time} 
                      onChange={handleTimeChange}
                    />
              <span className='song-time'>3:00</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaySongs;
