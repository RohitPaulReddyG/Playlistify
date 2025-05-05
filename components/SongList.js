
export default function SongList({ songs, selectedSongs, toggleSongSelection }) {
  if (!songs || songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No playlists found</h3>
        <p className="text-gray-500 max-w-md">
          Make sure you have playlists in your Spotify account or try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs.map((song, index) => (
          <div 
            key={index} 
            className={`bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
              selectedSongs.includes(song) ? 'ring-2 ring-green-500 transform scale-[1.02]' : ''
            }`}
            onClick={() => toggleSongSelection(song)}
          >
            <div className="relative pb-[60%] overflow-hidden">
              <img 
                src={song.thumbnail || 'https://via.placeholder.com/300?text=No+Image'} 
                alt={song.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className={`absolute inset-0 flex items-center justify-center ${selectedSongs.includes(song) ? 'bg-black bg-opacity-40' : 'bg-black bg-opacity-0 hover:bg-opacity-30'} transition-all duration-300`}>
                {selectedSongs.includes(song) && (
                  <div className="bg-white rounded-full p-3 shadow-lg transform scale-110 animate-pulse">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg text-gray-900 truncate">{song.title}</h3>
              <p className="text-gray-600 text-sm truncate">{song.artist}</p>
              <div className="mt-3 flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center ${
                  selectedSongs.includes(song) ? 'border-green-500 bg-green-500' : 'border-gray-300'
                }`}>
                  {selectedSongs.includes(song) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-600">
                  {selectedSongs.includes(song) ? 'Selected' : 'Click to select'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
    