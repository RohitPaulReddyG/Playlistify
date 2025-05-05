
export default function SongList({ songs, selectedSongs, toggleSongSelection }) {
  if (!songs || songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No playlists found</h3>
        <p className="text-gray-500 text-sm max-w-md">
          Make sure you have playlists in your Spotify account or try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {songs.map((song, index) => (
          <div 
            key={index} 
            className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
              selectedSongs.includes(song) ? 'ring-2 ring-green-500 transform scale-[1.02]' : ''
            }`}
            onClick={() => toggleSongSelection(song)}
          >
            <div className="relative aspect-square">
              <img 
                src={song.thumbnail || 'https://via.placeholder.com/300?text=No+Image'} 
                alt={song.title} 
                className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
              />
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                selectedSongs.includes(song) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <div className={`p-2 rounded-full ${
                  selectedSongs.includes(song) ? 'bg-green-500' : 'bg-white/90'
                }`}>
                  <svg className={`w-5 h-5 ${
                    selectedSongs.includes(song) ? 'text-white' : 'text-gray-700'
                  }`} fill="currentColor" viewBox="0 0 20 20">
                    {selectedSongs.includes(song) ? (
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    ) : (
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    )}
                  </svg>
                </div>
              </div>
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black/50 text-white">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0z"/>
                  </svg>
                  Playlist
                </span>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm text-gray-900 truncate">{song.title}</h3>
              <p className="text-xs text-gray-500 truncate mt-1">{song.artist}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600">
                  {selectedSongs.includes(song) ? 'Selected' : 'Click to select'}
                </span>
                <div className={`w-4 h-4 rounded-full border transition-colors ${
                  selectedSongs.includes(song) ? 'border-green-500 bg-green-500' : 'border-gray-300'
                }`}>
                  {selectedSongs.includes(song) && (
                    <svg className="w-4 h-4 text-white p-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
    