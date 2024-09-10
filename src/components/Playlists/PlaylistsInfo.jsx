import React, { useEffect, useState } from 'react';
import './PlaylistsInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaylistsInfo = () => {
  const [playlists, setPlaylists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPlaylist, setSearchPlaylist] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const playlistsPerPage = 6;
  const navigate = useNavigate();

  const getAcessToken = async () => {
    const clientId = '4c3210c79b5843999f163b67c7255616';
    const clientSecret = '2b04cd3858014ad9908b10d9cd08ef1d';
    const authaccessToken = `${clientId}:${clientSecret}`;
    const accessToken = btoa(authaccessToken);

    try {
      const response = await axios.post('https://accounts.spotify.com/api/token',
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
      console.error("Error receiving Spotify API access token", error);
      return null;
    }
  };

  const fetchPlaylists = async () => {
    const token = await getAcessToken();

    if (!token) {
      console.error('Failed to get access token');
      return;
    }

    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const [vnPlaylistsResponse, usPlaylistsResponse, ukPlaylistsResponse] = await Promise.all([
        axios.get('https://api.spotify.com/v1/search', {
          headers,
          params: {
            q: 'Vietnam',
            type: 'playlist',
            limit: 50,
            market: 'VN',
          },
        }),
        axios.get('https://api.spotify.com/v1/search', {
          headers,
          params: {
            q: 'United States',
            type: 'playlist',
            limit: 50,
            market: 'US',
          },
        }),
        axios.get('https://api.spotify.com/v1/search', {
          headers,
          params: {
            q: 'United Kingdom',
            type: 'playlist',
            limit: 50,
            market: 'GB',
          },
        })
      ]);

      const combinedPlaylists = [
        ...vnPlaylistsResponse.data.playlists.items,
        ...usPlaylistsResponse.data.playlists.items,
        ...ukPlaylistsResponse.data.playlists.items
      ];

      setPlaylists(combinedPlaylists);
    } catch (error) {
      console.error('Error fetching playlists from Spotify API', error);
    }
  };

  const fetchTracks = async (playlistId, playlistName) => {
    const token = await getAcessToken();

    if(!token) {
      console.error('Failed to get access token');
      return;
    }

    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
      }

      const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers,
      });

      setTracks(response.data.items);
      setSelectedPlaylist(playlistName);
      navigate(`/playlists/${encodeURIComponent(playlistName)}`);
    } catch(error) {
      console.error('Error fetching tracks from Spotify API', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  
  const indexOfLastPlaylist = currentPage * playlistsPerPage;
  const indexOfFirstPlaylist = indexOfLastPlaylist - playlistsPerPage;
  
  // Filter playlists based on the search 
  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchPlaylist.toLowerCase())
  );
  
  const currentPlaylists = filteredPlaylists.slice(indexOfFirstPlaylist, indexOfLastPlaylist);
  const totalPages = Math.ceil(filteredPlaylists.length / playlistsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleSearchChange = (e) => {
    setSearchPlaylist(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className='playlistsinfo-container'>
        <div className='playlists-info-navbar-container'>
          <form action='' className='playlists-info-navbar'>
            <input
              type='text'
              placeholder='Search for playlist'
              value={searchPlaylist}
              onChange={handleSearchChange}
            />
            <button type='submit'><FontAwesomeIcon className='search-icon' icon={faSearch} /></button>
          </form>

          <button onClick={handleHomeClick} className='lni lni-home home-button'></button>
        </div>

        
        
        <div className='playlists-info-container'>
          <div className='playlists'>
            {currentPlaylists.map((playlist) => (
              <div key={playlist.id} className='playlist-card' onClick={() => setSelectedPlaylist(playlist)}>
                <img className='playlist-image' src={playlist.images[0]?.url} alt={playlist.name} />
                <p className='playlist-name'>{playlist.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='pagination'>
          <button
            className='lni lni-angle-double-right previous-button'
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          ></button>
          <span className='pagination-page'>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className='lni lni-angle-double-right next-button'
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          ></button>
        </div>
      </div>
    </>
  );
};

export default PlaylistsInfo;
