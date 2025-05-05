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
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (session) {
      fetchSongs();
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
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
      setCurrentStep(3);
    } catch (err) {
      console.error(err);
      setError('Failed to create YouTube playlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="max-w-3xl mx-auto mb-10 px-4">
        <div className="flex items-center justify-between">
          <div className={`flex flex-col items-center`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= 1 
                ? 'glass-card bg-gradient-to-br from-purple-500 to-pink-500 ring-2 ring-purple-400/50' 
                : 'glass-card opacity-50'
            }`}>
              <span className="text-lg font-semibold text-white">1</span>
            </div>
            <span className={`mt-2 text-sm font-medium ${
              currentStep >= 1 ? 'text-purple-300' : 'text-gray-500'
            }`}>Login</span>
          </div>
          <div className={`flex-1 h-1 mx-2 rounded ${
            currentStep >= 2 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
              : 'bg-gray-800'
          }`}></div>
          <div className={`flex flex-col items-center`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= 2 
                ? 'glass-card bg-gradient-to-br from-purple-500 to-pink-500 ring-2 ring-purple-400/50' 
                : 'glass-card opacity-50'
            }`}>
              <span className="text-lg font-semibold text-white">2</span>
            </div>
            <span className={`mt-2 text-sm font-medium ${
              currentStep >= 2 ? 'text-purple-300' : 'text-gray-500'
            }`}>Select</span>
          </div>
          <div className={`flex-1 h-1 mx-2 rounded ${
            currentStep >= 3 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
              : 'bg-gray-800'
          }`}></div>
          <div className={`flex flex-col items-center`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= 3 
                ? 'glass-card bg-gradient-to-br from-purple-500 to-pink-500 ring-2 ring-purple-400/50' 
                : 'glass-card opacity-50'
            }`}>
              <span className="text-lg font-semibold text-white">3</span>
            </div>
            <span className={`mt-2 text-sm font-medium ${
              currentStep >= 3 ? 'text-purple-300' : 'text-gray-500'
            }`}>Enjoy</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Head>
        <title>PlayListify - Convert Spotify to YouTube</title>
        <meta name="description" content="Convert your Spotify playlists to YouTube playlists" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      {loading && <ProgressBar />}
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl pointer-events-none"></div>
        
        {renderStepIndicator()}
        
        {!session ? (
          <div className="mt-8">
            <div className="glass-card overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
              <div className="md:flex items-stretch">
                <div className="md:w-1/3 bg-gradient-to-br from-purple-500 to-pink-500 p-8 flex items-center justify-center">
                  <img 
                    src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" 
                    alt="Spotify Logo" 
                    className="h-16 animate-float"
                  />
                </div>
                <div className="p-8 md:w-2/3">
                  <div className="text-purple-400 font-semibold mb-2">Step 1</div>
                  <h2 className="text-3xl font-bold mb-4 gradient-text">Welcome to PlayListify</h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Convert your Spotify playlists to YouTube playlists in three simple steps:
                  </p>
                  <ol className="space-y-4 text-gray-300 mb-8">
                    <li className="flex items-center">
                      <span className="glass-card w-8 h-8 rounded-full flex items-center justify-center mr-3 text-purple-400">1</span>
                      <span>Connect your Spotify account to access your playlists</span>
                    </li>
                    <li className="flex items-center">
                      <span className="glass-card w-8 h-8 rounded-full flex items-center justify-center mr-3 text-purple-400">2</span>
                      <span>Choose which playlists you want to convert</span>
                    </li>
                    <li className="flex items-center">
                      <span className="glass-card w-8 h-8 rounded-full flex items-center justify-center mr-3 text-purple-400">3</span>
                      <span>Get your YouTube playlist instantly</span>
                    </li>
                  </ol>
                  <button 
                    onClick={() => document.querySelector('button[data-provider="spotify"]').click()}
                    className="btn-gradient text-white font-medium py-3 px-8 rounded-full inline-flex items-center group transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02z"/>
                    </svg>
                    Get Started with Spotify
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="glass-card p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold gradient-text mb-2">Step 2: Select Your Playlists</h2>
                  <p className="text-gray-300">Choose the playlists you want to convert to YouTube</p>
                </div>
                <div className="glass-card px-4 py-2 rounded-full text-purple-300">
                  {selectedSongs.length} selected
                </div>
              </div>
              
              <SongList 
                songs={songs} 
                selectedSongs={selectedSongs} 
                toggleSongSelection={toggleSongSelection} 
              />
            </div>
            
            {error && (
              <div className="glass-card p-4 mb-8 border border-red-500/20 flex items-center text-red-400">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <div className="flex justify-center">
              <button 
                onClick={createPlaylist}
                disabled={selectedSongs.length === 0 || loading}
                className={`btn-gradient py-3 px-8 rounded-full inline-flex items-center group transition-all duration-300 ${
                  (selectedSongs.length === 0 || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                    Create YouTube Playlist
                  </>
                )}
              </button>
            </div>
            
            {playlistLink && playlistLink.length > 0 && (
              <div className="mt-8">
                <div className="glass-card overflow-hidden">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                    <h3 className="text-xl font-bold flex items-center text-white">
                      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                      Step 3: Your YouTube Playlist is Ready!
                    </h3>
                    <p className="text-red-100 mt-1">Click on any link below to open the video on YouTube</p>
                  </div>
                  <div className="p-6 divide-y divide-gray-800">
                    {playlistLink.map((song, index) => (
                      <div key={index} className="py-4 flex items-center group hover:bg-white/5 rounded-lg px-4 transition-colors">
                        <span className="glass-card text-red-400 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                          </svg>
                        </span>
                        <div className="flex-grow">
                          <h4 className="font-medium text-gray-200">{song.title}</h4>
                          <a 
                            href={song.youtubeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 text-sm flex items-center mt-1 group"
                          >
                            <svg className="w-4 h-4 mr-1 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                            Open on YouTube
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 bg-gradient-to-b from-transparent to-black/20">
                    <button 
                      onClick={() => {setCurrentStep(2); setPlaylistLink([]);}}
                      className="glass-card hover:bg-white/10 text-gray-300 font-medium py-2 px-6 rounded-full transition-all duration-300 hover:scale-105"
                    >
                      Convert More Playlists
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      
      <footer className="glass-card m-4 mt-auto">
        <div className="container mx-auto px-4 max-w-6xl py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold flex items-center gradient-text">
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 12L15 8V16L9 12Z" fill="currentColor"/>
                </svg>
                PlayListify
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Convert Spotify playlists to YouTube with ease
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">© {new Date().getFullYear()} PlayListify. All rights reserved.</p>
              <p className="text-gray-500 text-sm mt-1">
                Not affiliated with Spotify or YouTube.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
