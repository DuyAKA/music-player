import React from 'react';
import FilterBar from './FilterBar';
import PopularArtists from './PopularArtists';
import AllArtists from './AllArtists';
import './Artists.css';

const Artists = () => {
  return (
    <>
    <div className='artists-container'>
        <FilterBar/>
        <div style={{display: "block", flex: 1}}>
          <PopularArtists/> 
          <AllArtists/> 
        </div>
    </div>
    </> 
  )
}

export default Artists