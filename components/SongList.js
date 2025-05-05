
export default function SongList({ songs, selectedSongs, toggleSongSelection }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Select Songs 🎶</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {songs.map((song, index) => (
          <li key={index} className="flex flex-col items-center">
            <img src={song.thumbnail} alt="thumbnail" className="w-32 h-32 object-cover rounded-lg mb-2" />
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedSongs.includes(song)}
                onChange={() => toggleSongSelection(song)}
                className="mr-2"
              />
              <div className="text-center text-sm">
                {song.title}<br/>{song.artist}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
    