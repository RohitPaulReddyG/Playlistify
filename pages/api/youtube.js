import axios from 'axios';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const { songs } = req.body;
  
  try {
    const session = await getSession({ req });
    
    if (!session) {
      return res.status(401).json({ 
        message: 'Please sign in to continue',
        error: 'not_authenticated'
      });
    }
    
    // Explicitly check for Google authentication
    if (session.provider !== 'google') {
      return res.status(401).json({ 
        message: 'Please sign in with Google to create YouTube playlists',
        error: 'google_auth_required'
      });
    }

    // Check for valid Google access token
    if (!session.accessToken) {
      return res.status(401).json({ 
        message: 'Your Google session has expired. Please sign in again.',
        error: 'token_expired'
      });
    }

    // Create a new playlist
    let playlistResponse;
    try {
      playlistResponse = await axios.post('https://www.googleapis.com/youtube/v3/playlists', {
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
    } catch (error) {
      if (error.response?.status === 401) {
        return res.status(401).json({
          message: 'Your Google session has expired. Please sign in again.',
          error: 'token_expired'
        });
      }
      throw error;
    }

    const playlistId = playlistResponse.data.id;
    const youtubePlaylist = [];
    const errors = [];

    // Add videos to the playlist
    for (let song of songs) {
      try {
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
        if (!videoId) {
          errors.push({ song: song.title, error: 'Video not found' });
          continue;
        }

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
      } catch (songError) {
        console.error(`Failed to add song "${song.title}":`, songError.response?.data || songError.message);
        errors.push({ song: song.title, error: 'Failed to add to playlist' });
      }
    }

    res.status(200).json({ 
      playlistUrl: youtubePlaylist,
      playlistLink: `https://www.youtube.com/playlist?list=${playlistId}`,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error('YouTube API error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      return res.status(401).json({ 
        message: 'Authentication error. Please sign in again.',
        error: error.response?.data?.error || 'token_expired'
      });
    }
    
    res.status(500).json({ 
      message: error.response?.data?.message || 'An unexpected error occurred. Please try again.',
      error: error.response?.data?.error || error.message
    });
  }
}
