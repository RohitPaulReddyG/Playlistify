
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Header from '../components/Header';
import SongList from '../components/SongList';
import ProgressBar from '../components/ProgressBar';
import axios from 'axios';
import Head from 'next/head';

export default function Home() {
  const { data: session } = useSession();
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistLink, setPlaylistLink] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (session) {
      fetchSongs();
    }
  }, [session]);

  const fetchSongs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/spotify', { access_token: session.accessToken });
      setSongs(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch your Spotify playlists. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSongSelection = (song) => {
    setSelectedSongs((prev) => {
      if (prev.includes(song)) {
        return prev.filter((s) => s !== song);
      }
      return [...prev, song];
    });
  };

  const createPlaylist = async () => {
    if (selectedSongs.length === 0) {
      setError('Please select at least one playlist');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/youtube', { songs: selectedSongs });
      setPlaylistLink(res.data.playlistUrl);
    } catch (err) {
      console.error(err);
      setError('Failed to create YouTube playlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>PlayListify - Convert Spotify to YouTube</title>
        <meta name="description" content="Convert your Spotify playlists to YouTube playlists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {loading && <ProgressBar />}
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {!session ? (
          <div className="mt-10 text-center">
            <div className="max-w-2xl mx-auto card p-8">
              <h2 className="text-3xl font-bold mb-4">Welcome to PlayListify</h2>
              <p className="text-gray-600 mb-6">
                Convert your favorite Spotify playlists to YouTube playlists with just a few clicks.
                Login with your Spotify account to get started.
              </p>
              <img 
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" 
                alt="Spotify Logo" 
                className="h-16 mx-auto mb-6"
              />
              <p className="text-sm text-gray-500">
                Please login to Spotify to access your playlists.
              </p>
            </div>
          </div>
        ) : (
          <>
            <SongList 
              songs={songs} 
              selectedSongs={selectedSongs} 
              toggleSongSelection={toggleSongSelection} 
            />
            
            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            <div className="mt-8 flex justify-center">
              <button 
                onClick={createPlaylist} 
                disabled={selectedSongs.length === 0 || loading}
                className={`btn btn-primary px-8 py-3 text-lg flex items-center ${
                  (selectedSongs.length === 0 || loading) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Create YouTube Playlist
                  </>
                )}
              </button>
            </div>
            
            {playlistLink && playlistLink.length > 0 && (
              <div className="mt-10 card">
                <h3 className="text-xl font-semibold mb-4">Playlist Created! 🎉</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {playlistLink.map((song, index) => (
                      <li key={index} className="py-3 flex items-center">
                        <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                          </svg>
                        </span>
                        <div className="flex-grow">
                          <h4 className="font-medium">{song.title}</h4>
                          <a 
                            href={song.youtubeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            {song.youtubeUrl}
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} PlayListify. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">
            Not affiliated with Spotify or YouTube.
          </p>
        </div>
      </footer>
    </div>
  );
}
    