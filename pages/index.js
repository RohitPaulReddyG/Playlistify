
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
          <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-green-600 bg-green-100' : 'border-gray-300'}`}>
              <span className="text-lg font-semibold">1</span>
            </div>
            <span className="mt-2 text-sm font-medium">Login</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
          <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-green-600 bg-green-100' : 'border-gray-300'}`}>
              <span className="text-lg font-semibold">2</span>
            </div>
            <span className="mt-2 text-sm font-medium">Select</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
          <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= 3 ? 'border-green-600 bg-green-100' : 'border-gray-300'}`}>
              <span className="text-lg font-semibold">3</span>
            </div>
            <span className="mt-2 text-sm font-medium">Enjoy</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>PlayListify - Convert Spotify to YouTube</title>
        <meta name="description" content="Convert your Spotify playlists to YouTube playlists" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      {loading && <ProgressBar />}
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
        {renderStepIndicator()}
        
        {!session ? (
          <div className="mt-6">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0 bg-purple-600 md:w-48 flex items-center justify-center p-8">
                  <img 
                    src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" 
                    alt="Spotify Logo" 
                    className="h-16"
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">Step 1</div>
                  <h2 className="text-3xl font-bold mt-2 mb-4 text-gray-800">Welcome to PlayListify</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    PlayListify helps you convert your favorite Spotify playlists to YouTube playlists in just three simple steps:
                  </p>
                  <ol className="list-decimal pl-5 mb-6 space-y-2 text-gray-600">
                    <li><span className="font-medium">Login with Spotify</span> - Connect your Spotify account to access your playlists</li>
                    <li><span className="font-medium">Select playlists</span> - Choose which playlists you want to convert</li>
                    <li><span className="font-medium">Create YouTube playlist</span> - Get YouTube links for all your selected songs</li>
                  </ol>
                  <div className="mt-6">
                    <button 
                      onClick={() => document.querySelector('button[data-provider="spotify"]').click()}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                      Get Started with Spotify
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Step 2: Select Your Playlists</h2>
                  <p className="text-gray-600">Choose the playlists you want to convert to YouTube</p>
                </div>
                <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
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
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-xl border border-red-200 flex items-center">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <div className="mt-8 flex justify-center">
              <button 
                onClick={createPlaylist} 
                disabled={selectedSongs.length === 0 || loading}
                className={`bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center ${
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
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                    Create YouTube Playlist
                  </>
                )}
              </button>
            </div>
            
            {playlistLink && playlistLink.length > 0 && (
              <div className="mt-10 bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 text-white">
                  <h3 className="text-xl font-bold flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                    Step 3: Your YouTube Playlist is Ready!
                  </h3>
                  <p className="text-red-100 mt-1">Click on any link below to open the video on YouTube</p>
                </div>
                <div className="p-6">
                  <ul className="divide-y divide-gray-200">
                    {playlistLink.map((song, index) => (
                      <li key={index} className="py-4 flex items-center hover:bg-gray-50 rounded-lg px-2 transition-colors">
                        <span className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                          </svg>
                        </span>
                        <div className="flex-grow">
                          <h4 className="font-medium text-gray-800">{song.title}</h4>
                          <a 
                            href={song.youtubeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm flex items-center mt-1"
                          >
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                            Open on YouTube
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-center">
                    <button 
                      onClick={() => {setCurrentStep(2); setPlaylistLink([]);}} 
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-all duration-200"
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
      
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold flex items-center">
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 12L15 8V16L9 12Z" fill="currentColor"/>
                </svg>
                PlayListify
              </h3>
              <p className="text-gray-400 mt-1">Convert Spotify playlists to YouTube with ease</p>
            </div>
            <div className="text-center md:text-right">
              <p>© {new Date().getFullYear()} PlayListify. All rights reserved.</p>
              <p className="text-gray-400 text-sm mt-1">
                Not affiliated with Spotify or YouTube.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
    