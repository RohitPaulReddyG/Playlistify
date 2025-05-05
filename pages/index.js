
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Header from '../components/Header';
import SongList from '../components/SongList';
import ProgressBar from '../components/ProgressBar';
import axios from 'axios';

export default function Home() {
  const { data: session } = useSession();
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistLink, setPlaylistLink] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      fetchSongs();
    }
  }, [session]);

  const fetchSongs = async () => {
    try {
      const res = await axios.post('/api/spotify', { access_token: session.accessToken });
      setSongs(res.data);
    } catch (err) {
      console.error(err);
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

  const createPlaylist = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/youtube', { songs: selectedSongs });
      setPlaylistLink(res.data.playlistUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      {loading && <ProgressBar />}
      <Header />
      <main className="my-8">
        {!session ? (
          <p>Please login to Spotify to create your playlist.</p>
        ) : (
          <>
            <SongList songs={songs} selectedSongs={selectedSongs} toggleSongSelection={toggleSongSelection} />
            <button onClick={createPlaylist} className="bg-blue-600 text-white p-4 rounded mt-4">Create YouTube Playlist</button>
            {playlistLink && (
              <div className="mt-6">
                <h3 className="font-semibold">Playlist Created! 🎉</h3>
                <ul>
                  {playlistLink.map((song, index) => (
                    <li key={index}>
                      <a href={song.youtubeUrl} target="_blank" className="text-blue-600">{song.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
    