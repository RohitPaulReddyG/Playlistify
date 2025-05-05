
import axios from 'axios';

export default async function handler(req, res) {
  const { access_token } = req.body;

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const songs = response.data.items.map(item => ({
      title: item.name,
      artist: item.artists[0]?.name,
      thumbnail: item.images[0]?.url || ''
    }));

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Spotify data' });
  }
}
    