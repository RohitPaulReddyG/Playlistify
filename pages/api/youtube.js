
import axios from 'axios';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const { songs } = req.body;
  
  // For now, we'll just search for videos without creating a playlist
  // since we need to implement Google OAuth for playlist creation
  const youtubePlaylist = [];

  try {
    for (let song of songs) {
      const search = `${song.title} ${song.artist} official music video`;
      const youtubeRes = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: search,
          key: process.env.YOUTUBE_API_KEY,
          maxResults: 1,
          type: 'video'
        }
      });

      const videoId = youtubeRes.data.items[0]?.id?.videoId;
      if (videoId) {
        youtubePlaylist.push({
          title: song.title,
          youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`
        });
      }
    }

    // Note: To create actual YouTube playlists, we need to implement Google OAuth
    res.status(200).json({ 
      playlistUrl: youtubePlaylist,
      message: "To create YouTube playlists, please implement Google OAuth in your application."
    });
  } catch (error) {
    console.error('YouTube API error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error searching YouTube videos' });
  }
}
    