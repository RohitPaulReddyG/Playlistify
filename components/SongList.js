export default function SongList({ songs, selectedSongs, toggleSongSelection }) {
  if (!songs || songs.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="animate-float glass-card inline-block p-4 rounded-full mb-4">
          <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        <p className="text-gray-400 mb-2">No songs found in your playlist</p>
        <p className="text-sm text-gray-500">Try selecting a different playlist or add some songs</p>
      </div>
    );
  }

  return (
    <div className="playlist-grid">
      {songs.map((song, index) => (
        <div
          key={index}
          onClick={() => toggleSongSelection(song)}
          className="glass-card overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10"
        >
          <div className="relative aspect-square">
            <img
              src={song.thumbnail || 'https://via.placeholder.com/300?text=No+Image'}
              alt={song.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              selectedSongs.includes(song) 
                ? 'bg-indigo-500/40 backdrop-blur-sm' 
                : 'bg-black/0 group-hover:bg-black/30'
            }`}>
              <div className={`transform transition-all duration-300 ${
                selectedSongs.includes(song) ? 'scale-100' : 'scale-0 group-hover:scale-100'
              }`}>
                {selectedSongs.includes(song) ? (
                  <div className="glass-card px-4 py-2 rounded-full text-white text-sm font-medium">
                    Selected
                  </div>
                ) : (
                  <div className="glass-card px-4 py-2 rounded-full text-white text-sm font-medium">
                    Select
                  </div>
                )}
              </div>
            </div>
            <div className="absolute top-2 left-2">
              <span className="glass-card px-2 py-1 text-xs font-medium text-white/80 rounded-full">
                {song.type || 'Track'}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-sm text-white truncate">{song.title}</h3>
            <p className="text-xs text-indigo-300 truncate mt-1">{song.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
