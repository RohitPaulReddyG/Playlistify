import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Header from '../components/Header';
import SongList from '../components/SongList';
import ProgressBar from '../components/ProgressBar';
import axios from 'axios';
import Head from 'next/head';

export default function Home() {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistLink, setPlaylistLink] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (session) {
      fetchPlaylists();
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }
  }, [session]);

  const fetchPlaylists = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/spotify', { access_token: session.accessToken });
      setPlaylists(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch your Spotify playlists. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaylistSongs = async (playlist) => {
    setLoading(true);
    setError('');
    setCurrentPlaylist(playlist);
    setSongs([]);
    setSelectedSongs([]);
    
    try {
      const res = await axios.post('/api/spotify', { 
        access_token: session.accessToken,
        playlistId: playlist.id
      });
      setSongs(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch songs from this playlist. Please try again.');
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

  const toggleSelectAll = () => {
    if (selectedSongs.length === songs.length) {
      setSelectedSongs([]);
    } else {
      setSelectedSongs([...songs]);
    }
  };

  const createPlaylist = async () => {
    if (selectedSongs.length === 0) {
      setError('Please select at least one song');
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
      <div className="max-w-3xl mx-auto mb-12 px-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute inset-x-8 h-0.5 bg-gray-800">
            <div className={`h-full transition-all duration-500 ease-out ${
              currentStep >= 2 ? 'w-1/2' : 'w-0'
            } ${currentStep >= 3 ? 'w-full' : ''} bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}></div>
          </div>
          
          <div className="flex flex-col items-center z-10">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
              currentStep >= 1 
                ? 'glass-card bg-gradient-to-br from-indigo-500 to-purple-500 ring-2 ring-indigo-400/30 scale-100' 
                : 'glass-card opacity-50 scale-90'
            }`}>
              <span className="text-lg font-semibold text-white">1</span>
            </div>
            <span className={`mt-3 text-sm font-medium transition-all duration-500 ${
              currentStep >= 1 ? 'text-indigo-300' : 'text-gray-500'
            }`}>Login</span>
          </div>

          <div className="flex flex-col items-center z-10">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
              currentStep >= 2 
                ? 'glass-card bg-gradient-to-br from-purple-500 to-pink-500 ring-2 ring-purple-400/30 scale-100' 
                : 'glass-card opacity-50 scale-90'
            }`}>
              <span className="text-lg font-semibold text-white">2</span>
            </div>
            <span className={`mt-3 text-sm font-medium transition-all duration-500 ${
              currentStep >= 2 ? 'text-purple-300' : 'text-gray-500'
            }`}>Select</span>
          </div>

          <div className="flex flex-col items-center z-10">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
              currentStep >= 3 
                ? 'glass-card bg-gradient-to-br from-pink-500 to-rose-500 ring-2 ring-pink-400/30 scale-100' 
                : 'glass-card opacity-50 scale-90'
            }`}>
              <span className="text-lg font-semibold text-white">3</span>
            </div>
            <span className={`mt-3 text-sm font-medium transition-all duration-500 ${
              currentStep >= 3 ? 'text-pink-300' : 'text-gray-500'
            }`}>Enjoy</span>
          </div>
        </div>
      </div>
    );
  };

  const goBack = () => {
    setCurrentPlaylist(null);
    setSongs([]);
    setSelectedSongs([]);
  };

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <Head>
        <title>PlayListify - Convert Spotify to YouTube</title>
        <meta name="description" content="Convert your Spotify playlists to YouTube playlists effortlessly" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      {loading && <ProgressBar />}
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl relative">
        {renderStepIndicator()}
        
        {!session ? (
          <div className="mt-8">
            <div className="glass-card overflow-hidden transform transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="p-8 md:p-12">
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-bold mb-6 gradient-text">Welcome to PlayListify</h2>
                  <p className="text-gray-300 text-lg mb-8">Transform your Spotify playlists into YouTube playlists with just a few clicks. Connect your account to get started.</p>
                  <button 
                    onClick={() => signIn('spotify')}
                    className="btn-gradient py-3 px-8 rounded-full inline-flex items-center group transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Connect with Spotify
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div className="glass-card p-4 mb-8 border border-red-500/20 flex items-center text-red-400 animate-pulse-slow">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            {!currentPlaylist ? (
              <div className="glass-card p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold gradient-text mb-2">Your Spotify Playlists</h2>
                    <p className="text-gray-300">Select a playlist to choose songs for conversion</p>
                  </div>
                  <div className="glass-card px-4 py-2 rounded-full text-indigo-300">
                    {playlists.length} playlists
                  </div>
                </div>
                
                <div className="playlist-grid">
                  {playlists.map((playlist, index) => (
                    <div
                      key={index}
                      onClick={() => fetchPlaylistSongs(playlist)}
                      className="glass-card overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10"
                    >
                      <div className="relative aspect-square">
                        <img
                          src={playlist.thumbnail || 'https://via.placeholder.com/300?text=No+Image'}
                          alt={playlist.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all duration-300">
                          <div className="transform scale-0 group-hover:scale-100 transition-all duration-300">
                            <div className="glass-card px-4 py-2 rounded-full text-white text-sm font-medium">
                              View Songs
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className="glass-card px-2 py-1 text-xs font-medium text-white/80 rounded-full">
                            {playlist.tracks} songs
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-sm text-white truncate">{playlist.title}</h3>
                        <p className="text-xs text-indigo-300 truncate mt-1">By {playlist.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="glass-card p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <button 
                      onClick={goBack}
                      className="text-indigo-400 hover:text-indigo-300 mb-4 flex items-center"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to Playlists
                    </button>
                    <h2 className="text-2xl font-bold gradient-text mb-2">{currentPlaylist.title}</h2>
                    <p className="text-gray-300">Select songs to convert to a YouTube playlist</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={toggleSelectAll}
                      className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center"
                    >
                      {selectedSongs.length === songs.length ? (
                        <>
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
                          </svg>
                          Deselect All
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-6.293a1 1 0 01-1.414-1.414L8.586 9H5a1 1 0 010-2h3.586L7.293 5.707a1 1 0 011.414-1.414l3 3a1 1 0 010 1.414l-3 3z"/>
                          </svg>
                          Select All
                        </>
                      )}
                    </button>
                    <div className="glass-card px-4 py-2 rounded-full text-indigo-300">
                      {selectedSongs.length} selected
                    </div>
                  </div>
                </div>
                
                <SongList 
                  songs={songs} 
                  selectedSongs={selectedSongs} 
                  toggleSongSelection={toggleSongSelection} 
                />

                {selectedSongs.length > 0 && (
                  <div className="flex justify-center mt-8">
                    <button 
                      onClick={createPlaylist}
                      disabled={loading}
                      className="btn-gradient py-3 px-8 rounded-full inline-flex items-center group transition-all duration-300 hover:scale-105"
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
                )}
              </div>
            )}

            {playlistLink && playlistLink.length > 0 && (
              <div className="mt-8">
                <div className="glass-card overflow-hidden">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                    <h3 className="text-xl font-bold flex items-center text-white">
                      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                      Your YouTube Playlist is Ready!
                    </h3>
                    <div className="flex items-center mt-2">
                      <a 
                        href={playlistLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-red-100 text-sm flex items-center group"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M15 2a3 3 0 013 3v10a3 3 0 01-3 3H5a3 3 0 01-3-3V5a3 3 0 013-3h10zm-1 3H6a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V6a1 1 0 00-1-1zm-2 3a1 1 0 011 1v2a1 1 0 01-1 1H8a1 1 0 01-1-1V9a1 1 0 011-1h4z"/>
                        </svg>
                        Open Full Playlist
                      </a>
                      <span className="mx-2 text-red-200">•</span>
                      <span className="text-red-100 text-sm">{playlistLink.length} videos added</span>
                    </div>
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
      
      <footer className="glass-card mx-4 mb-4">
        <div className="container mx-auto px-6 max-w-6xl py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold flex items-center gradient-text">
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 12L15 8V16L9 12Z" fill="currentColor"/>
                </svg>
                PlayListify
              </h3>
              <p className="text-gray-400 text-sm mt-2">Convert your Spotify playlists to YouTube with ease</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">© {new Date().getFullYear()} PlayListify. All rights reserved.</p>
              <p className="text-gray-500 text-sm mt-1">Not affiliated with Spotify or YouTube.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
