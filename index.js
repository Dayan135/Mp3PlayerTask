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
  /*playSong(song) {
    const title = song.title, album = song.album, artist = song.artist;
    //minutes and seconds for duration required format.
    let mins = Math.floor(song.duration/60); 
    let secs = song.duration%60; 
    console.log("Playing " + title + " from " + album + " by " + artist + " | " + mins + ":" + secs);
  },*/
  playSong(song) {
    console.log(`Playing ${song.title} from ${song.album} by ${(song.artist)} | ${convertDuration(song.duration)}.`)
  },
}

// player.playSong(player.songs[0])


function convertDuration(duration) {
  //converts duration format from seconds to 'mm:ss' and oposite
  if(typeof(duration) === 'number'){
    let min  = Math.floor(duration / 60);
    let sec = duration % 60;

    if (min < 10) {
      min = "0" + String(min);
    }
    if (sec < 10) {
      sec = "0" + String(sec);
    }

    return min + ':' + sec
  }
  else{//if its a string
    return parseInt(duration.slice(3)) + parseInt(duration.slice(0,2)) * 60;
  }
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
      throw(id + " id already exist!");
    }
  }
  return id;
}

function getEl(arr, id){
  //gets an array and id. return the object of the array that has the id.
  //throws exception otherwise.
  for(let el of arr){
    if(el.id === id){
      return el;
    }
  }
  throw("couldn't find element where id=" + id);
}
//console.log(getEl(player.songs, 2))
//player.playSong(player.songs[0]);
//console.log(generateID(player.playlists));

function playSong(id) {
  const song = getEl(player.songs,id);
  player.playSong(song);
}

// playSong(1);

function removeSong(id) {
  let song2delete = getEl(player.songs,id);
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

  duration = convertDuration(duration);

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

// removeSong(1);
// addSong("hello","almub","dayan","07:53", 1);
// console.log(player);

function removePlaylist(id) {
  let pl = getEl(player.playlists, id);
  const index = player.playlists.indexOf(pl);
  player.playlists.splice(index,1);
}

// removePlaylist(5)
// console.log(player)

function createPlaylist(name, id) {
  id = generateID(player.playlists, id);

  player.playlists.push({
    id: id,
    name: name,
    songs: []
  });
}

// createPlaylist("dayan");
// console.log(player)


function playPlaylist(id) {
  const pl = getEl(player.playlists,id);
  
  for(let i = 0; i < pl.songs.length; i++){
    player.playSong(getEl(player.songs, pl.songs[i]))
  }
}

// playPlaylist(1);

function editPlaylist(playlistId, songId) {
  getEl(player.songs, songId)//if the song doesnt exist- throw exception
  let pl = getEl(player.playlists,playlistId);
  
  const index = pl.songs.indexOf(songId);
  if(index > -1){//if the song id exists in the playlist
    if(pl.songs.length === 1){//if its the only song
      removePlaylist(playlistId);
    }
    else{ 
      pl.songs.splice(index,1);
    }
  }
  else{
    pl.songs.push(songId);
  }
}

// editPlaylist(1,2)
// editPlaylist(5,5)
// editPlaylist(5,4);
// console.log(player);

function playlistDuration(id) {
  const pl = getEl(player.playlists,id);
  if(!pl){
    return//TODO: throw.
  }
  let dur = 0;
  for(let songId of pl.songs){
    dur += getEl(player.songs,songId).duration;
  }
  return dur;
}

// console.log(playlistDuration(1));

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  let secs = parseInt(duration.slice(3));
  let mins = parseInt(duration.slice(0,2));
  duration = mins*60 + secs;

  let el = player.songs[0];
  let minDif = Math.abs(player.songs[0].duration - duration);
  
  let sub;
  for(let song of player.songs){
    sub = Math.abs(song.duration - duration)
    if(sub < minDif){
      minDif = sub;
      el = song;
    }
  }

  for(let pl of player.playlists){
    playlistDuration(pl.id)
  }
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