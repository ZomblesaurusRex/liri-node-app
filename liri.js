var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var inquirer = require("inquirer");
var moment = require('moment');
var Spotify = require('node-spotify-api');



// variable for the argument of each command to be used
var operator = process.argv[2];
// variable for user search, taking 3rd position index of argument on as whole string
var userInput = process.argv.slice(3).join(" ");

function liriRun(operator, userInput) {
    moment().format();
    switch (operator) {
        case "spotify-this":
            getSpotify(userInput);
            break;
            //spotify isnt defined

        case "concert-this":
            getBandsInTown(userInput);
            break;

        case "movie-this":
            getOMBD(userInput);
            break;
            //movie value isnt defined

        case "do-this":
            getRandom();
            break;

        default:
            console.log("I'm sorry, I dont quite understand. Could you please use one of my commands: 'concert-this', 'spotify-this', 'movie-this', or 'do-this'?")

    }
};

function getSpotify(songTitle) {
    var spotify = new Spotify(keys.spotify);
    var songTitle = userInput;
    if (!songTitle) {
        songTitle = "Dinosaur Laser Fight";
    };

    spotify.search({ type: 'track', query: songTitle }, function (err, data) {
        // console.log(data.tracks.items[0].artists[0].name)
        if (err) {
            return
            console.log("Error occurred: " + err);
        }
        console.log("Song Title: " + data.tracks.items[0].name + "\r\n");
        console.log("Artist(s) Name: " + data.tracks.items[0].artists[0].name + "\r\n");
        console.log("Preview Me: " + data.tracks.items[0].href + "\r\n");
        console.log("Album: " + data.tracks.items[0].album.name + "\r\n");
        console.log("Listen on Spotify: " + data.tracks.items[0].album.external_urls.spotify + "\r\n");
        console.log("___________________________________________\r\n");

        var recordSong = "==========Star Log year 2019==========\n" + "\nArtist(s) Name: " + data.tracks.items[0].artists[0].name + "\r\nPreview Me: " + data.tracks.items[0].href + "\r\nAlbum: " + data.tracks.items[0].album.name + "Listen on Spotify: " + data.tracks.items[0].album.external_urls.spotify + "\r\n___________________________________________\r\n";

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
            var data = response.data[0];
            console.log("Venue Name: " + data.venue.name + "\r\n")
            console.log("Venue City: " + data.venue.city + "\r\n")
            console.log("Event Date: " + moment(data.datetime).format("MM-DD-YYYY") + "\r\n")
            console.log("Event URL: " + data.url + "\r\n")
            console.log("___________________________________________\r\n");

            var recordConcert = "==========Star Log year 2019==========" + "\nVenue Name: " + response.data[0].venue.name + "\r\nVenue Coordinates: " + response.data[0].venue.city + "\r\nEvent Date: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\r\n___________________________________________\r\n";

            fs.appendFile("captains-log.txt", recordConcert, function (err) {
                if (err) throw err;
            });

        })
};


function getOMBD(movie) {
    var movie = userInput;

    if (!movie) {
        movie = "Night of the Living Dead";
    }
    var movieQueryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.get(movieQueryURL).then(
        function (response) {
            var data = response.data;
            console.log("Title: " + data.Title + "\r\n");
            console.log("Year Released: " + data.Year + "\r\n");
            console.log("Produced in: " + data.Country + "\r\n");
            console.log("Language: " + data.Language + "\r\n");
            console.log("Plot: " + data.Plot + "\r\n");
            console.log("Cast: " + data.Actors + "\r\n");
            console.log("___________________________________________\r\n");

            var recordMovie = "==========Star Log year 2019==========" + "Title: " + data.Title + "\r\nYear Released: " + data.Year + "\r\nProduced in: " + data.Country + "\r\nLanguage: " + data.Language + "\r\nPlot: " + data.Plot + "\r\nCast: " + data.Actors + "\r\n___________________________________________\r\n";

            fs.appendFile("captains-log.txt", recordMovie, function (err) {
                if (err) throw err;
            });

        });

};

function getRandom() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            return console.log(error);
        } else {
            var randomData = data.split(", ");
            liriRun(randomData[0], randomData[1]);
            process.argv = "node liri.js " + randomData;
            
        };
    });
    
    function logResults(data) {
        fs.appendFile("captains-log.txt", data, function(err){
            if (err) throw err;
            return;
        });
    };
};

liriRun(operator, userInput);


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