const player = {
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {
    const title = song.title, album = song.album, artist = song.artist;
    //minutes and seconds for duration required format.
    let mins = Math.floor(song.duration/60); 
    let secs = song.duration%60; 
    console.log("Playing " + title + " from " + album + " by " + artist + " | " + mins + ":" + secs);
  },
}

//player.playSong(player.songs[0]);

function playSong(id) {
  for(let song of player.songs){
    if(song.id === id){
      player.playSong(song)
      return;
    }
    //else...
  }
}

//playSong(5);

function removeSong(id) {
  let song2delete = null;
  for(let song of player.songs){
    if(song.id === id){
      //search for the specific song objects that has the wanted id
      song2delete = song;
    }
  }
  if(song2delete){//if the wanted song (by id) had found
    const index = player.songs.indexOf(song2delete);
    player.songs.splice(index,1); //deletes the wanted song from the songs array.

    for(const pl of player.playlists){
      let songs = pl.songs;
      const i = songs.indexOf(id);
      if(i > -1){
        songs.splice(i,1);
      }
    }
  }
}

function addSong(title, album, artist, duration = "00:00", id) {
  
  //creates an array of all the songs id.
  let ids = [];
  for(let song of player.songs){
    ids.push(song.id);
  }

  if(!id){//if id is undifined => optional!
    let i = 1;
    while(ids.includes(i)){
      i++;
    }
    id = i;
  }
  else{//if id has been given, checks if it already used.
    if(ids.includes(id)){
      //TODO: throw an exxeption or something
      return(-1)
    }
  }

  let secs = parseInt(duration.slice(3));
  let mins = parseInt(duration.slice(0,2));
  duration = mins*60 + secs;

  //TODO: find a better way to generate the object
  let newSong={
    id: id,
    title: title,
    album: album,
    artist: artist,
    duration: duration,
  }

  player.songs.push(newSong)

  return id;
}

/*removeSong(1);
addSong("hello","almub","dayan","07:53", 1);
console.log(player);*/

function removePlaylist(id) {
  // your code here
}

function createPlaylist(name, id) {
  // your code here
}

function playPlaylist(id) {
  // your code here
}

function editPlaylist(playlistId, songId) {
  // your code here
}

function playlistDuration(id) {
  // your code here
}

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  // your code here
}
/*
module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}
*/