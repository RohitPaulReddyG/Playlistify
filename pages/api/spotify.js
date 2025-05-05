
import axios from 'axios';

export default async function handler(req, res) {
  const { access_token } = req.body;

  try {
    // Change endpoint to fetch user's playlists instead of top artists
    const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    // Map playlist items to our song format
    const songs = response.data.items.flatMap(playlist => {
      return {
        title: playlist.name,
        artist: playlist.owner.display_name,
        thumbnail: playlist.images[0]?.url || '',
        id: playlist.id
      };
    });

    res.status(200).json(songs);
  } catch (error) {
    console.error('Spotify API error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching Spotify data' });
  }
}
    