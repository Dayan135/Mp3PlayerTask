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
    //parameters - song (type object)
    //prints the song details
    const title = song.title, album = song.album, artist = song.artist;
    const dur = convertDuration(song.duration);
    console.log("Playing " + title + " from " + album + " by " + artist + " | " + dur + ".");
  },
  // playSong(song) {
  //   console.log(`Playing ${song.title} from ${song.album} by ${(song.artist)} | ${convertDuration(song.duration)}.`)
  // },
}

// player.playSong(player.songs[0])


function convertDuration(duration) {
  //parameters - duration (type string('mm:ss') / number(seconds))
  //return string('mm:ss') if number was given
  //return number(seconds) if string was given
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
  //parameters - arr (type array(of objects))
  //             id (type number)(optional)
  //if id is given - checks if it aviable id (if its not already used)
  //if id isnt given - generate new id
  //returns the id

  let ids = [];//an array that includes all the ids of the objects in arr
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
  //parameters - arr (type array(of objects))
  //             id (type number) (optional)
  //returns the object in the array that has the wanted id.
  for(let el of arr){
    if(el.id === id){
      return el;
    }
  }
  throw("couldn't find element where id=" + id);
}

function playSong(id) {
  //parameters - id (type number)
  //plays the song that has the wanted id
  const song = getEl(player.songs,id);
  player.playSong(song);
}

function removeSong(id) {
  //parameters - id (type number)
  //removes the song with the wanted id(from songs array and from all the playlists)
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

function addSong(title, album, artist, duration = "00:00", id) {
  //parameters - title (type string)
  //             album (type string)
  //             artist (type string)
  //             duration (type string)(format 'mm:ss')
  //             id(type number)(optional)
  //creates new song, add it to songs array.
  //return his id
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

function removePlaylist(id) {
  //parameters - id(type number)
  //removes the playlist with the wanted id
  let pl = getEl(player.playlists, id);
  const index = player.playlists.indexOf(pl);
  player.playlists.splice(index,1);
}

function createPlaylist(name, id) {
  //parameters - name (type string)
  //             id (type number)(optional)
  //creates new playlist with the name and id, and with empty songs array.
  //return the new plalist's id.
  id = generateID(player.playlists, id);

  player.playlists.push({
    id: id,
    name: name,
    songs: []
  });

  return id;
}

function playPlaylist(id) {
  //parameters - id(type number)
  //plays all the song from the playlist that has the wanted id.
  const pl = getEl(player.playlists,id);
  for(let i = 0; i < pl.songs.length; i++){
    player.playSong(getEl(player.songs, pl.songs[i]))
  }
}

function editPlaylist(playlistId, songId) {
  //parameters - playlistId(type number)
  //             songId(type number)
  //if song id exists in the playlist - remove it. 
  //(if it was the last song - remove the whole playlist)
  //if it doesnt exist - add it to the playlist
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
  else{//if the song id doesnt exist in the playlist
    pl.songs.push(songId);
  }
}

function playlistDuration(id) {
  //parameters - id(type number) 
  //returns the full duration of all song of the wanted playlist.
  const pl = getEl(player.playlists,id);

  let dur = 0;
  for(let songId of pl.songs){
    dur += getEl(player.songs, songId).duration;
  }
  return dur;
}

function searchByQuery(query) {
  //parameters - query(type string)
  //return object of songs array and plalists array (sorted).
  //songs that their title/album/artist contains the query string.
  //playlists that their name contains the query string.
  let res = {
    songs:[],
    playlists:[]
  };

  for(const song of player.songs){//passes on all the songs
    const vals = Object.values(song)
    for(const val of vals){
      if(typeof(val) === 'string'){
        if(val.toLowerCase().includes(query.toLowerCase())){
          res.songs.push(song);
          break;
        }
      }
    }
  }

  for(const pl of player.playlists){
    if(pl.name.toLowerCase() === query.toLowerCase()){
      res.playlists.push(pl);
    }
  }

  res.songs.sort((s1,s2) => s1.title.localeCompare(s2.title));
  res.playlists.sort((pl1,pl2) => pl1.name.localeCompare(pl2.name))

  return res;
}

function searchByDuration(duration) {
  //parameters - duration(type string)(format 'mm:ss')
  //return the song/playlist that has the closest duration to the given duration.
  duration = convertDuration(duration);

  let el = player.songs[0]; //the element with the smallest difference from wanted duration.
  let minDif = Math.abs(player.songs[0].duration - duration); //the smallest difference.
  
  let sub;
  for(let song of player.songs){//runs over the songs' duration.
    sub = Math.abs(song.duration - duration)
    if(sub < minDif){
      minDif = sub;
      el = song;
    }
  }

  for(let pl of player.playlists){//runs over the playlists' duration.
    sub = Math.abs(playlistDuration(pl.id) - duration)
    if(sub < minDif){
      minDif = sub;
      el = pl
    }
  }
  return el;
}

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
