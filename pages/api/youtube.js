import axios from 'axios';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const { songs } = req.body;
  
  try {
    const session = await getSession({ req });
    if (!session || !session.accessToken || session.provider !== 'google') {
      return res.status(401).json({ message: 'Please sign in with Google to create YouTube playlists' });
    }

    // Create a new playlist
    const playlistResponse = await axios.post('https://www.googleapis.com/youtube/v3/playlists', {
      snippet: {
        title: 'Spotify Playlist',
        description: 'Created with PlayListify - Convert your Spotify playlists to YouTube'
      },
      status: {
        privacyStatus: 'private'
      }
    }, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json'
      },
      params: {
        part: 'snippet,status'
      }
    });

    const playlistId = playlistResponse.data.id;
    const youtubePlaylist = [];

    // Add videos to the playlist
    for (let song of songs) {
      // Search for the video
      const search = `${song.title} ${song.artist} official music video`;
      const searchRes = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: search,
          key: process.env.YOUTUBE_API_KEY,
          maxResults: 1,
          type: 'video'
        }
      });

      const videoId = searchRes.data.items[0]?.id?.videoId;
      if (videoId) {
        // Add video to playlist
        await axios.post('https://www.googleapis.com/youtube/v3/playlistItems', {
          snippet: {
            playlistId: playlistId,
            resourceId: {
              kind: 'youtube#video',
              videoId: videoId
            }
          }
        }, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json'
          },
          params: {
            part: 'snippet'
          }
        });

        youtubePlaylist.push({
          title: song.title,
          youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`
        });
      }
    }

    // Return the playlist URL and individual video URLs
    res.status(200).json({ 
      playlistUrl: youtubePlaylist,
      playlistLink: `https://www.youtube.com/playlist?list=${playlistId}`
    });
  } catch (error) {
    console.error('YouTube API error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error creating YouTube playlist' });
  }
}
