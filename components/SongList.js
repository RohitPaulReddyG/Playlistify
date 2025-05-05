export default function SongList({ songs, selectedSongs, toggleSongSelection }) {
  if (!songs || songs.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="animate-float glass-card inline-block p-4 rounded-full mb-4">
          <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold gradient-text mb-4">No playlists found</h3>
        <button 
          onClick={() => window.location.reload()}
          className="btn-gradient px-6 py-2 rounded-full text-white hover:scale-105 transition-all duration-300"
        >
          Refresh Playlists
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {songs.map((song, index) => (
        <div 
          key={index}
          onClick={() => toggleSongSelection(song)}
          className={`group glass-card overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer ${
            selectedSongs.includes(song) ? 'ring-2 ring-purple-400' : ''
          }`}
        >
          <div className="relative aspect-square">
            <img 
              src={song.thumbnail || 'https://via.placeholder.com/300?text=No+Image'}
              alt={song.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              selectedSongs.includes(song) ? 'bg-purple-500/40 backdrop-blur-sm' : 'bg-black/0 group-hover:bg-black/30'
            }`}>
              <div className={`transform transition-all duration-300 ${
                selectedSongs.includes(song) ? 'scale-100' : 'scale-0 group-hover:scale-100'
              }`}>
                {selectedSongs.includes(song) ? (
                  <div className="glass-card p-3 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div className="glass-card p-3 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute top-2 left-2">
              <span className="glass-card px-2 py-1 text-xs font-medium text-white rounded-full flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02z"/>
                </svg>
                Playlist
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-sm text-white truncate">{song.title}</h3>
            <p className="text-xs text-purple-300 truncate mt-1">{song.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
