import React, { useEffect, useState } from 'react';
import './AllArtists.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllArtists = () => {
    const [vnArtists, setVnArtists] = useState([]);
    const [usArtists, setUsArtists] = useState([]);
    const [ukArtists, setUkArtists] = useState([]);

        const getSpotifyAccessToken = async () => {
            const client_id = '4c3210c79b5843999f163b67c7255616';
            const client_secret = '2b04cd3858014ad9908b10d9cd08ef1d';
            const authaccessToken = `${client_id}:${client_secret}`;
            const accessToken = btoa(authaccessToken);
            

            try {
                const response = await axios.post('https://accounts.spotify.com/api/token',
                    'grant_type=client_credentials',
                    {
                        headers: {
                            'Authorization': `Basic ${accessToken}`,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                );
                return response.data.access_token;
                
            } catch (error) {
                console.error("Error receiving Spotify API access token", error);
                return null;
            }
        };

        const fetchArtists = async () => {
            const token = await getSpotifyAccessToken();

            if (!token) {
                console.error('Failed to get access token');
                return;
            }

            try {
                const headers = {
                    'Authorization': `Bearer ${token}`
                };

                const vnArtistsResponse = await axios.get('https://api.spotify.com/v1/search', {
                    headers, 
                    params: {
                        q: 'genre: r-n-b, indie, hip-hop, edm, rock, pop',
                        type: 'artist',
                        market: "VN",
                        limit: 6,
                    },
                });
                

                const usArtistsResponse = await axios.get('https://api.spotify.com/v1/search', {
                    headers, 
                    params: {
                        q: 'genre: r-n-b, indie, hip-hop, edm, rock, pop',
                        type: 'artist',
                        market: 'US',
                        limit: 6,
                    },
                });

                const ukArtistsResponse = await axios.get('https://api.spotify.com/v1/search', {
                    headers, 
                    params: {
                        q: 'genre: r-n-b, indie, hip-hop, edm, rock, pop',
                        type: 'artist',
                        market: 'GB',
                        limit: 6,
                    },
                });

                setVnArtists(vnArtistsResponse.data.artists.items);
                setUsArtists(usArtistsResponse.data.artists.items);
                setUkArtists(ukArtistsResponse.data.artists.items);

            } catch (error) {
                console.error('Error fetching artists from Spotify API', error);
            }
        };
    
        useEffect(() => {
        fetchArtists();
    
    }, []);

    return (
        <>
        <div className='all-artists'>
            <div className='all-artists-line justify-content-between'>
                <h3 className='artists-home-part-title'>All Artists:</h3>
                <Link to="/artists/allartists" className='text-end show-all'>Show All</Link>
            </div>
            <div id='artistsCarousel1' className='carousel slide' data-bs-ride='carousel'>
                <div className='carousel-inner'>
                    {vnArtists.length > 0 && (
                        <div className='carousel-item active'>
                            <div className='row artists-row'>
                                {vnArtists.map(artist => (
                                    <div key={artist.id} className='col-2'> 
                                        <div className='artists-card'>
                                            <img src={artist.images[0]?.url} className='d-block rounded-circle artists-images' alt={artist.name} />
                                            <h5 className='artists-name'>{artist.name}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {usArtists.length > 0 && (
                        <div className='carousel-item'>
                            <div className='row artists-row'>
                                {usArtists.map(artist => (
                                    <div key={artist.id} className='col-2'> 
                                        <div className='artists-card'>
                                            <img src={artist.images[0]?.url} className='d-block rounded-circle artists-images' alt={artist.name} />
                                            <h5 className='artists-name'>{artist.name}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {ukArtists.length > 0 && (
                        <div className='carousel-item'>
                            <div className='row artists-row'>
                                {ukArtists.map(artist => (
                                    <div key={artist.id} className='col-2'> 
                                        <div className='artists-card'>
                                            <img src={artist.images[0]?.url} className='d-block rounded-circle artists-images' alt={artist.name} />
                                            <h5 className='artists-name'>{artist.name}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#artistsCarousel1" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#artistsCarousel1" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        </>
    )
}

export default AllArtists;
