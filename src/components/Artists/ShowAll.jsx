import React, { useEffect, useState } from 'react';
import './ShowAll.css';
import FilterBar from './FilterBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShowAll = () => {
    const { genre, market } = useParams();
    const [vnArtists, setVnArtists] = useState([]);
    const [usArtists, setUsArtists] = useState([]);
    const [ukArtists, setUkArtists] = useState([]);

    const getSpotifyAccessToken = async () => {
        const clientId = '4c3210c79b5843999f163b67c7255616';
        const clientSecret = '2b04cd3858014ad9908b10d9cd08ef1d';
        const authAccessToken = `${clientId}:${clientSecret}`;
        const accessToken = btoa(authAccessToken);

        try {
            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                'grant_type=client_credentials',
                {
                    headers: {
                        'Authorization': `Basic ${accessToken}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            return response.data.access_token;
        } catch (error) {
            console.error('Error receiving Spotify API access token', error);
            return null;
        }
    };

    const fetchAllArtists = async () => {
        const token = await getSpotifyAccessToken();

        if (!token) {
            console.error('Failed to get access token');
            return;
        }

        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const vnArtistsResponse = await axios.get(
                'https://api.spotify.com/v1/search',
                {
                    headers,
                    params: {
                        q: 'genre: r-n-b, indie, hip-hop, edm, rock, pop',
                        type: 'artist',
                        market: 'VN',
                        limit: 50,
                    },
                }
            );

            const usArtistsResponse = await axios.get(
                'https://api.spotify.com/v1/search',
                {
                    headers,
                    params: {
                        q: 'genre: r-n-b, indie, hip-hop, edm, rock, pop',
                        type: 'artist',
                        market: 'US',
                        limit: 50,
                    },
                }
            );

            const ukArtistsResponse = await axios.get(
                'https://api.spotify.com/v1/search',
                {
                    headers,
                    params: {
                        q: 'genre: r-n-b, indie, hip-hop, edm, rock, pop',
                        type: 'artist',
                        market: 'GB',
                        limit: 50,
                    },
                }
            );

            setVnArtists(vnArtistsResponse.data.artists.items);
            setUsArtists(usArtistsResponse.data.artists.items);
            setUkArtists(ukArtistsResponse.data.artists.items);

            console.log('Vietnam Artists:', vnArtistsResponse.data.artists.items);
            console.log('US Artists:', usArtistsResponse.data.artists.items);
            console.log('UK Artists:', ukArtistsResponse.data.artists.items);
        } catch (error) {
            console.error('Error fetching artists from Spotify API', error);
        }
    };

    useEffect(() => {
        fetchAllArtists();
    }, [genre, market]);

    const renderArtists = (artists) => {
        return artists
            .filter(artist => {
                const artistGenre = !genre || artist.genres.some(g =>
                    g.toLowerCase().replace(/-/g, ' ').includes(genre.toLowerCase().replace(/-/g, ' '))
                );

                return artistGenre;
            })
            .map((artist) => (
                <div key={artist.id} className='artist-card'>
                    <img src={artist.images[0]?.url} alt={artist.name} className='d-block rounded-circle artist-image'/>
                    <h5 className='artist-name'>{artist.name}</h5>
                </div>
            ));
    };

    return (
        <>
            <div style={{ display: 'flex', background: 'black'}}>
                <FilterBar style={{position: 'sticky'}}/>
                <div className='show-all-artists'>
                    <div className='all-artists-title-container'>
                        <h1 className='all-artists-title'>{genre ? genre.toUpperCase() : 'All Artists'}</h1>
                    </div>
                    <div className='all-artists-container'>
                        {market === 'VN' && renderArtists(vnArtists)}
                        {market === 'US' && renderArtists(usArtists)}
                        {market === 'GB' && renderArtists(ukArtists)}
                        {!market && (
                            <>
                                {renderArtists(vnArtists)}
                                {renderArtists(usArtists)}
                                {renderArtists(ukArtists)}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowAll;
