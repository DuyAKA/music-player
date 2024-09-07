import React, { useEffect, useState } from 'react';
import './Genres.css';
import FilterBar from './FilterBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Genres = () => {
    const { genre } = useParams();
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

    const fetchArtistsByGenre = async () => {
        const token = await getSpotifyAccessToken();

        if (!token) {
            console.error('Failed to get access token');
            return;
        }

        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const fetchArtists = async (market) => {
                const response = await axios.get(
                    'https://api.spotify.com/v1/search',
                    {
                        headers,
                        params: {
                            q: `genre:${genre}`,
                            type: 'artist',
                            market,
                            limit: 30,
                        },
                    }
                );
                return response.data.artists.items;
            };

            const [vnArtistsResponse, usArtistsResponse, ukArtistsResponse] = await Promise.all([
                fetchArtists('VN'),
                fetchArtists('US'),
                fetchArtists('GB')
            ]);

            setVnArtists(vnArtistsResponse);
            setUsArtists(usArtistsResponse);
            setUkArtists(ukArtistsResponse);

        } catch (error) {
            console.error('Error fetching artists from Spotify API', error);
        }
    };

    useEffect(() => {
        fetchArtistsByGenre();
    }, [genre]);

    const renderArtists = (artists) => {
        return artists.map((artist, index) => (
            <div key={artist.id} className='artist-card'>
                <img src={artist.images[0]?.url} alt={artist.name} className='d-block rounded-circle artist-image'/>
                <h5 className='artist-name'>{artist.name}</h5>
            </div>
        ));
    };

    return (
        <div style={{ display: 'flex', background: 'black'}}>
            <FilterBar style={{ position: 'sticky' }}/>
            <div className='show-all-artists'>
                <div className='all-artists-title-container'>
                    <h1 className='all-artists-title'>{genre ? genre.toUpperCase() : 'All Artists'}</h1>
                </div>
                <div className='all-artists-container'>
                    {renderArtists(vnArtists)}
                    {renderArtists(usArtists)}
                    {renderArtists(ukArtists)}
                </div>
            </div>
        </div>
    );
};

export default Genres;
