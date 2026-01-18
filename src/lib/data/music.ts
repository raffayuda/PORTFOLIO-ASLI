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
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        album: 'A Night at the Opera',
        cover: '/music/covers/bohemian-rhapsody.jpg',
        duration: '5:55',
        audioUrl: '/music/audio/sample.mp3',
        spotifyUrl: 'https://open.spotify.com/track/4u7EnebtmKWzUH433cf5Qv'
    },
    {
        id: 2,
        title: 'Hotel California',
        artist: 'Eagles',
        album: 'Hotel California',
        cover: '/music/covers/hotel-california.jpg',
        duration: '6:30',
        audioUrl: '/music/audio/sample.mp3',
        spotifyUrl: 'https://open.spotify.com/track/40riOy7x9W7GXjyGp4pjAv'
    },
    {
        id: 3,
        title: 'Stairway to Heaven',
        artist: 'Led Zeppelin',
        album: 'Led Zeppelin IV',
        cover: '/music/covers/stairway.jpg',
        duration: '8:02',
        audioUrl: '/music/audio/sample.mp3',
        spotifyUrl: 'https://open.spotify.com/track/5CQ30WqJwcep0pYcV4AMNc'
    },
    {
        id: 4,
        title: 'Imagine',
        artist: 'John Lennon',
        album: 'Imagine',
        cover: '/music/covers/imagine.jpg',
        duration: '3:03',
        audioUrl: '/music/audio/sample.mp3',
        spotifyUrl: 'https://open.spotify.com/track/7pKfPomDEeI4TPT6EOYjn9'
    },
    {
        id: 5,
        title: 'Sweet Child O Mine',
        artist: 'Guns N Roses',
        album: 'Appetite for Destruction',
        cover: '/music/covers/sweet-child.jpg',
        duration: '5:56',
        audioUrl: '/music/audio/sample.mp3',
        spotifyUrl: 'https://open.spotify.com/track/7o2CTH4ctstm8TNelqjb51'
    }
];

// You can add your own songs here!
// For audioUrl, you can:
// 1. Use local audio files in /static/music/audio/
// 2. Use Spotify embed URLs
// 3. Use other streaming service URLs
