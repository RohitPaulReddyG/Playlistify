
export default function SongList({ songs, selectedSongs, toggleSongSelection }) {
  if (!songs || songs.length === 0) {
    return (
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Playlists 🎶</h2>
        <div className="card p-8">
          <p className="text-gray-500">No playlists found. Make sure you have playlists in your Spotify account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Select Playlists 🎶</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs.map((song, index) => (
          <div 
            key={index} 
            className={`card cursor-pointer transition-all duration-300 ${
              selectedSongs.includes(song) ? 'ring-2 ring-green-500 transform scale-[1.02]' : ''
            }`}
            onClick={() => toggleSongSelection(song)}
          >
            <div className="relative pb-[100%] overflow-hidden rounded-md mb-3">
              <img 
                src={song.thumbnail || 'https://via.placeholder.com/300?text=No+Image'} 
                alt={song.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="bg-white bg-opacity-90 rounded-full p-2">
                  {selectedSongs.includes(song) ? (
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-lg truncate">{song.title}</h3>
              <p className="text-gray-600 text-sm truncate">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
    