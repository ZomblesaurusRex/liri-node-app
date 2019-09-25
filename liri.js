var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");

var inquirer = require("inquirer");
// Include the Spotify NPM packages
// Include the moment NPM packages
var moment = require('moment');
// moment().format();

// variable for the argument of each command to be used
var operator = process.argv[2];
// variable for user search, taking 3rd position index of argument on as whole string
var userInput = process.argv.slice(3).join(" ");

function liriRun(opertor, userInput) {
    switch (operator) {
        case "spotify-this-song":
            getSpotify(userInput);
            break;

        case "concert-this":
            getBandsInTown(userInput);
            break;

        case "movie-this":
            getOMBD(userInput);
            break;

        case "do-this":
            getRandom();
            break;

        default:
            console.log("I'm sorry, I dont quite understand. Could you please use one of my commands: 'concert-this', 'spotify-this', 'movie-this', or 'do-this'?")

    }
};

function getSpotify(songTitle) {
    var spotify = new Spotify(keys.spotify);

    if (!songTitle) {
        songTitle = "Dinosaur Laser Fight";
    };

    spotify.search({ type: 'track', query: songTitle }, function (err, data) {
        if (err) {
            return
            console.log("Error occurred: " + err);
        }
        console.log("Artist(s) Name: " + data.tracks.items[0].name + "\r\n");
        console.log("Preview Me: " + data.tracks.items[0].href + "\r\n");
        console.log("Album: " + data.tracks.items[0].album.name + "\r\n");
        console.log("___________________________________________\r\n");

        var recordSong = "==========Star Log year 2019==========" + "\nArtist: " + data.tracks.items[0].album.artists[0].name;

        fs.appendFile("captains-log.txt", recordSong, function (err) {
            if (err) throw err;
        });

    });
};

function getBandsInTown(artist) {

    var artist = userInput;
    var bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(bandQueryURL).then(
        function (response) {
            console.log("Venue Name: " + response.data[0].venue.name + "\r\n")
            console.log("Venue Coordinates: " + response.data[0].venue.city + "\r\n")
            console.log("Event Date: " + (response.data[0].datetime).format("MM-DD-YYYY") + "\r\n")
            console.log("___________________________________________\r\n");

            var recordConcert = "==========Star Log year 2019==========" + "\nName of Artist: " + artist;

            fs.appendFile("captains-log.txt", recordConcert, function (err) {
                if (err) throw err;
            });

        })
};


function getOMBD(title) {

    
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("Response: " + JSON.stringify(response.data, null, 2));
        })
    .catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
    
}
    




//  if  concert-this   node liri.js concert-this <artist/band name here>
// search the bands in town database for that band names concerts
// make all data readable console.log(JSON.stringify(data, null, 2));
// consolelog[ name of venue,
// venue address
// date of the event (moment format MM/DD/YYYY)]
// end if statement

//   if spotify-this-song
// search the spotify database for that song on spotify
// make all data readable console.log(JSON.stringify(data, null, 2));
// consolelog[artist, 
// songs name, 
// preview link to spotify
// the album that the song is from]
// end else if statement


//   if movie-this
// search the spotify database for that song on spotify
// make all data readable console.log(JSON.stringify(data, null, 2));
//consolelog [* Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.]
// end else if statement
// Then run a request with axios to the OMDB API with the movie specified
//  ===============================================

// else
// consolelog sorry, I dont understand, could you try that again please?
// end else statmement


//    do-what-it-says