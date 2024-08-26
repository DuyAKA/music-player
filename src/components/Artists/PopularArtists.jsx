import React, { useEffect, useState } from 'react';
import './PopularArtists.css';
import axios from 'axios';

const ArtistsZone = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:3600/artists');
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  const groupArtistsForSlides = (artists, groupSize) => {
    const groups = [];
    for (let i = 0; i < artists.length; i += groupSize) {
      groups.push(artists.slice(i, i + groupSize));
    }
    return groups;
  };

  const groupedArtists = groupArtistsForSlides(artists, 6); 

  return (
    <div className='artists-zone'>
      <div className='artists-title-container'>
        <h1 className='artists-title'>Artists</h1>
      </div>

      <div className='artists-home-container'>
        <div className='popular-artists'>
        <h3 className='artists-home-part-title'>Popular Artists:</h3>
        <div id='artistsCarousel' className='carousel slide' data-bs-ride='carousel'>
          <div className='carousel-inner'>
            {groupedArtists.length > 0 ? (
              groupedArtists.map((group, groupIndex) => (
                <div key={groupIndex} className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`}>
                  <div className='row artists-row'>
                    {group.map(artist => (
                      <div key={artist.id} className='col-2'>
                        <div className='artists-card'>
                          <img src={artist.avatar} className='d-block rounded-circle artists-images' alt={artist.name} />
                          <h5 className='artists-name'>{artist.name}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className='carousel-item active'>
                <p>No artists found.</p>
              </div>
            )}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#artistsCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#artistsCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistsZone;
