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


function generateID(arr, id){
  //gets an array and optional id. returns if it aviable or creates one.
  //returns id if aviable. -1 otherwise.
  let ids = [];
  for(let cell of arr){
    ids.push(cell.id);
  }

  if(!id){//if id is undifined (optional!) => creates new one
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
  return id;
}

function getEl(arr, id){
  //gets an array and id. return the object of the array that has the id.
  //return null otherwise.
  for(let el of arr){
    if(el.id === id){
      return el;
    }
  }
  return null;
}
//console.log(getEl(player.songs, 2))
//player.playSong(player.songs[0]);
//console.log(generateID(player.playlists));

function playSong(id) {
  const song = getEl(player.songs,id);
  if(!song){//if there is no such element
    return;//TODO: throw exeptiuon
  }
  player.playSong(song);
}

//playSong(1);

function removeSong(id) {
  let song2delete = getEl(player.songs,id);
  if(!song2delete){
    return;//TODO: throw exception
  }
  const index = player.songs.indexOf(song2delete);
  player.songs.splice(index,1); //deletes the wanted song from the songs array.

  //searches and deletes the id of the song from all the playlists
  for(const pl of player.playlists){
    let songs = pl.songs;
    const i = songs.indexOf(id);
    if(i > -1){
      songs.splice(i,1);
    }
  }
}

// removeSong(1);
// console.log(player)


function addSong(title, album, artist, duration = "00:00", id) {
  //creates an array of all the songs id.
  id = generateID(player.songs, id);
  //console.log(id);
  if(id === -1){
    return;
    //TODO: throw exeption when id is not aviable.
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

//removeSong(1);
//addSong("hello","almub","dayan","07:53", 1);
//console.log(player);

function removePlaylist(id) {
  let pl = getEl(player.playlists, id);
  if(!pl){
    return;//TODO: throw exeption
  }
  const index = player.playlists.indexOf(pl);
  player.playlists.splice(index,1);
  // let i;
  // for(i = 0; i < player.playlists.length; i++){
  //   if(player.playlists[i].id === id){
  //     player.playlists.splice(i,1);
  //     return;
  //   }
  // }
}
/*
removePlaylist(1)
console.log(player)
*/
function createPlaylist(name, id) {
  id = generateID(player.playlists, id);
  if(id === -1){
    return;
    //TODO: throw exeption.
  }

  player.playlists.push({
    id: id,
    name: name,
    songs: []
  });
}
/*
createPlaylist("dayan", 1);
console.log(player)
*/

function playPlaylist(id) {
  const pl = getEl(player.playlists,id);
  if(!pl){
    return;//TODO: throw 
  }
  for(let i = 0; i < pl.songs.length; i++){
    player.playSong(pl.songs[i])
  }
}

// playPlaylist(1);

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