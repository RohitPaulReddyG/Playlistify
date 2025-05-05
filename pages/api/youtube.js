
import axios from 'axios';

export default async function handler(req, res) {
  const { songs } = req.body;
  
  const youtubePlaylist = [];

  for (let song of songs) {
    const search = `${song.title} ${song.artist} official music video`;
    const youtubeRes = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: search,
        key: process.env.YOUTUBE_API_KEY
      }
    });

    const videoId = youtubeRes.data.items[0]?.id?.videoId;
    youtubePlaylist.push({
      title: song.title,
      youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`
    });
  }

  res.status(200).json({ playlistUrl: youtubePlaylist });
}
    