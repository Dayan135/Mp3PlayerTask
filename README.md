MP3 player!

Types - 
- song 
    - `id`: a unique ID (number)
    - `title`: a title (string)
    - `album`: album title (string)
    - `artist`: artist name (string)
    - `duration`: duration (number, in seconds)
- playlist
    - `id`: a unique ID (number)
    - `name`: a name (string)
    - `songs`: an array of song IDs (array of numbers)
- player - main object
    - `songs`: represents the song in the player (array of song)
    - `playlists`: represents the playlists in the player (array of playlist)
    - `playSong`: a method that plays a song. (function)

Functions - 
- `playSong` -      Gets a song ID. Uses `player.playSong` to play the song with the given ID.
- `removeSong` -    Gets a song ID. Removes the song with the given ID from the player (from songs and playlists).
- `addSong` -       Gets a title, album, artist, duration & ID. Adds a new song with given properties to the player. The ID is optional, and if omitted should be automatically 
                    nerated. The song duration should be in `mm:ss` format (for example 06:27). Returns the ID of the new song.
- `removePlaylist` - Gets a playlist ID. Remove the playlist with the given ID from the player (does not delete the songs inside it).
- `createPlaylist` - Gets a name & ID. Creates a new, empty playlist with the given details. The ID is optional, and if omitted should be automatically generated. Returns the ID of
                    the new playlist.
- `playPlaylist` -  Gets a playlist ID. Plays all songs in the specified playlist, in the order the appear in the playlist.
- `editPlaylist` -  Gets a playlist ID & a song ID. If the song ID exists in the playlist, removes it. If it was the only song in the playlist, also deletes the playlist. If the song
                    ID does not exist in the playlist, adds it to the end of the playlist.
- `playlistDuration` - Gets a playlist ID. Returns the total duration of the entire playlist with the given ID.
- `searchByQuery` - Gets a query string. Returns a results object, which has:
    - `songs`:      an array of songs in which either title or album or artist contain the query string. The songs should be sorted by their titles.
    - `playlists`:  an array of playlists in which the name contains the query string. The playlists should be sorted by their names.

local functions (extra) - 
- `convertDuration` - gets duration. if its string, returns a number (of seconds). if its number returns a string ('mm:ss' format)
- `generateID` -      gets array (of songs or playlists) and id (number)(optional). if id has been given, returns the id if aviable. throws exception otherwise.
                      if id is not given, generate new unique id and returns it.
- `getEl` -           gets array (of songs or playlists) and id (number). returns the object with the fit id in the array. throws exeption if not found.
