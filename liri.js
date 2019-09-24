require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// bands in town api query url format
// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"


//  if  concert-this   node liri.js concert-this <artist/band name here>
// search the bands in town database for that band names concerts
// make all data readable
// consolelog[ name of venue,
// venue address
// date of the event (moment format MM/DD/YYYY)]
// end if statement

//   if spotify-this-song
// search the spotify database for that song on spotify
// make all data readable
// consolelog[artist, 
// songs name, 
// preview link to spotify
// the album that the song is from]
// end else if statement


//   if movie-this
// search the spotify database for that song on spotify
// make all data readable
//consolelog [* Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.]
// end else if statement

// else
// consolelog sorry, I dont understand, could you try that again please?
// end else statmement


//    do-what-it-says