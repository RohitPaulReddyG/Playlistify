import axios from 'axios';

export default async function handler(req, res) {
  const { access_token, playlistId } = req.body;

  try {
    if (playlistId) {
      // Fetch tracks from a specific playlist
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      // Map tracks to our song format
      const songs = response.data.items.map(item => ({
        title: item.track.name,
        artist: item.track.artists[0]?.name || 'Unknown Artist',
        thumbnail: item.track.album.images[0]?.url || '',
        id: item.track.id,
        duration: item.track.duration_ms,
        type: 'Track',
        preview_url: item.track.preview_url,
        external_urls: item.track.external_urls
      }));

      res.status(200).json(songs);
    } else {
      // Fetch user's playlists
      const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      // Map playlists to our format
      const playlists = response.data.items.map(playlist => ({
        title: playlist.name,
        artist: playlist.owner.display_name,
        thumbnail: playlist.images[0]?.url || '',
        id: playlist.id,
        tracks: playlist.tracks.total,
        type: 'Playlist'
      }));

      res.status(200).json(playlists);
    }
  } catch (error) {
    console.error('Spotify API error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching Spotify data' });
  }
}
