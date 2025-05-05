
export default function SongList({ songs, selectedSongs, toggleSongSelection }) {
  if (!songs || songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl shadow-sm">
        <div className="bg-white p-6 rounded-full shadow-md mb-6">
          <svg className="w-20 h-20 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">No playlists found</h3>
        <p className="text-gray-600 max-w-md px-6">
          Make sure you have playlists in your Spotify account or try refreshing the page.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {songs.map((song, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
              selectedSongs.includes(song) ? 'ring-3 ring-green-500' : 'border border-gray-100'
            }`}
            onClick={() => toggleSongSelection(song)}
          >
            <div className="relative pb-[70%] overflow-hidden">
              <img 
                src={song.thumbnail || 'https://via.placeholder.com/300?text=No+Image'} 
                alt={song.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className={`absolute inset-0 flex items-center justify-center ${
                selectedSongs.includes(song) 
                  ? 'bg-gradient-to-br from-green-500/60 to-blue-500/60' 
                  : 'bg-black/0 hover:bg-gradient-to-br hover:from-purple-500/40 hover:to-blue-500/40'
              } transition-all duration-300`}>
                {selectedSongs.includes(song) && (
                  <div className="bg-white rounded-full p-4 shadow-lg animate-bounce-slow">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              {/* Playlist type badge */}
              <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full">
                Playlist
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-xl text-gray-900 truncate mb-1">{song.title}</h3>
              <p className="text-gray-600 text-sm truncate mb-3">By {song.artist}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-2 flex items-center justify-center transition-colors ${
                    selectedSongs.includes(song) ? 'border-green-500 bg-green-500' : 'border-gray-300'
                  }`}>
                    {selectedSongs.includes(song) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {selectedSongs.includes(song) ? 'Selected' : 'Select'}
                  </span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02z"/>
                  </svg>
                  Spotify
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
    