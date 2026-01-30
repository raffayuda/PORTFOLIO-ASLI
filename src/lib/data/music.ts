// Music Playlist Data
// Data Playlist Musik

export interface Song {
    id: number;
    title: string;
    artist: string;
    album: string;
    cover: string;
    duration: string;
    audioUrl: string; // URL to audio file or Spotify embed
    spotifyUrl?: string; // Optional Spotify track URL
}

export const playlist: Song[] = [
    {
        id: 1,
        title: 'Crazy',
        artist: 'Beauz, JVNA',
        album: 'Unknown',
        cover: '/images/music1.png',
        duration: '3:08',
        audioUrl: '/audio/music1.mp3',
        spotifyUrl: 'https://open.spotify.com/track/4u7EnebtmKWzUH433cf5Qv'
    },
    {
        id: 2,
        title: 'Waiting',
        artist: 'Vicetone, Daisy Guttridge',
        album: 'Unknown',
        cover: '/images/music2.png',
        duration: '3:26',
        audioUrl: '/audio/music2.mp3',
        spotifyUrl: 'https://open.spotify.com/track/40riOy7x9W7GXjyGp4pjAv'
    },
    {
        id: 3,
        title: 'Umbrella',
        artist: 'Ember Island',
        album: 'Unknown',
        cover: '/images/music3.png',
        duration: '3:22',
        audioUrl: '/audio/music3.mp3',
        spotifyUrl: 'https://open.spotify.com/track/5CQ30WqJwcep0pYcV4AMNc'
    },
    {
        id: 4,
        title: 'Vacation',
        artist: 'Damon Empero, Veronica',
        album: 'Unknown',
        cover: '/images/music4.png',
        duration: '3:40',
        audioUrl: '/audio/music4.mp3',
        spotifyUrl: 'https://open.spotify.com/track/7pKfPomDEeI4TPT6EOYjn9'
    },
    {
        id: 5,
        title: 'Issues x Alan Walker',
        artist: 'Julia Michaels, Alan Walker',
        album: 'Unknown',
        cover: '/images/music5.png',
        duration: '3:06',
        audioUrl: '/audio/music5.mp3',
        spotifyUrl: 'https://open.spotify.com/track/7o2CTH4ctstm8TNelqjb51'
    },
    {
        id: 6,
        title: 'Stay',
        artist: 'Zedd, Alessia Cara',
        album: 'Unknown',
        cover: '/images/music6.png',
        duration: '3:32',
        audioUrl: '/audio/music6.mp3',
        spotifyUrl: 'https://open.spotify.com/track/7o2CTH4ctstm8TNelqjb51'
    }
];

// You can add your own songs here!
// For audioUrl, you can:
// 1. Use local audio files in /static/music/audio/
// 2. Use Spotify embed URLs
// 3. Use other streaming service URLs
