
export default function SongList({ songs, selectedSongs, toggleSongSelection }) {
  if (!songs || songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        <h3 className="text-sm font-medium text-gray-900">No playlists found</h3>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {songs.map((song, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-md overflow-hidden shadow-sm hover:shadow transition-all duration-200 cursor-pointer ${
              selectedSongs.includes(song) ? 'ring-1 ring-green-500' : ''
            }`}
            onClick={() => toggleSongSelection(song)}
          >
            <div className="relative pb-[100%]">
              <img 
                src={song.thumbnail || 'https://via.placeholder.com/300?text=No+Image'} 
                alt={song.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className={`absolute inset-0 flex items-center justify-center ${
                selectedSongs.includes(song) ? 'bg-black/20' : 'bg-black/0 hover:bg-black/10'
              } transition-all duration-200`}>
                {selectedSongs.includes(song) && (
                  <div className="bg-white/90 rounded-full p-0.5">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="absolute top-1 left-1">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] font-medium bg-black/40 text-white">
                  <svg className="w-2 h-2 mr-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0z"/>
                  </svg>
                  Playlist
                </span>
              </div>
            </div>
            <div className="p-2">
              <h3 className="text-xs font-medium text-gray-900 truncate">{song.title}</h3>
              <p className="text-[10px] text-gray-500 truncate mt-0.5">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
    