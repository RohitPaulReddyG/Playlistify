
export default function SongList({ songs, selectedSongs, toggleSongSelection }) {
  if (!songs || songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
        <div className="animate-pulse bg-white p-4 rounded-full shadow-md mb-4">
          <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-purple-900 mb-2">No playlists found</h3>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Refresh Playlists
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {songs.map((song, index) => (
          <div 
            key={index} 
            className={`group bg-white rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
              selectedSongs.includes(song) ? 'ring-2 ring-purple-500 shadow-purple-100' : 'shadow-md hover:shadow-purple-100'
            }`}
            onClick={() => toggleSongSelection(song)}
          >
            <div className="relative aspect-square">
              <img 
                src={song.thumbnail || 'https://via.placeholder.com/300?text=No+Image'} 
                alt={song.title} 
                className={`w-full h-full object-cover transition-all duration-300 ${
                  selectedSongs.includes(song) ? 'brightness-90' : 'group-hover:brightness-75'
                }`}
              />
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                selectedSongs.includes(song) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <div className={`transform transition-all duration-300 ${
                  selectedSongs.includes(song) ? 'scale-100' : 'scale-75 group-hover:scale-100'
                }`}>
                  {selectedSongs.includes(song) ? (
                    <div className="bg-purple-500 rounded-full p-2">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : (
                    <div className="bg-white/90 rounded-full p-2 shadow-lg">
                      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black/40 text-white backdrop-blur-sm">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02z"/>
                  </svg>
                  Playlist
                </span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-b from-white to-purple-50">
              <h3 className="font-medium text-sm text-gray-900 truncate">{song.title}</h3>
              <p className="text-xs text-purple-600 truncate mt-1 opacity-75">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
    