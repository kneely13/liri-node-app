require("dotenv").config(); //This code is to read and set any environment variables with the dotenv package:

//Code to import the keys.js file and store that in a variable
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var movieName = process.argv[3];
var trackName = process.argv[3];
var liriReturn = process.argv[2];
var moment = require('moment');


switch(liriReturn){
  case "concert-this":
  concertThis();
  break;

  case "spotify-this-song":
  spotifyThisSong();
  break;

  case "movie-this":
  movieThis();
  break;

  case "do-what-it-says":
  doWhatSays();
  break;

  default: console.log("\n"+
    "1.) Type one of the phrases into the terminal: "+"\n"+
    "\nnode liri.js concert-this (For event dates of artist or bands) " +
    "\nnode liri.js spotify-this-song (For info about songs) "+
    "\nnode liri.js movie-this (For info about movies)"+"\n"+"\n"+"\n"+
    // "\nnode liri.js do-what-it-says (Read about this command below) "+"\n"+"\n"+
    "2.) If you like to be specific, add more info to the commands above: "+"FOR EXAMPLES TYPE: node liri.js do-what-it-says "+"\n"+
    "\nconcert-this <artist/band name here> "+"\n" +
    "\nspotify-this-song '<any song name here>' \n(TIP: Use quotes for multiword song titles!!!)"+ "\n" +
    "\nmovie-this '<any movie name here>' "+"\n"
  ); 
};

function spotifyThisSong(trackName) {
  var trackName = process.argv[3];
  // var Spotify = require('node-spotify-api');
  // var spotify = new Spotify(keys.spotify);

  if(!trackName) {
    trackName ="The Sign";
  };

  songRequest = trackName;
  spotify.search({
    type: "track",
    query: songRequest
  },
    function (err, data) {
      if(!err){
        var trackInfo = data.tracks.items;
        for(var i = 0; i < 5; i++){
          if(trackInfo[i] != undefined) {
            var spotifyResults =
              "\nArtist: " + trackInfo[i].artists[0].name + "\n" + 
              "Song: " + trackInfo[i].name +
              "\n" +
              "Preview URL: " + trackInfo[i].preview_url + "\n" +
              "Album: " + trackInfo[i].album.name + "\n"

            console.log(spotifyResults);
            console.log(' ');
          };
        };
      } else {
        console.log("There was a error: " + err);
        return;
      };
    });

};

//request to the bandsInTown API for an artist and information about each event 

function concertThis(){

  artist = process.argv[3];

  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

  request(queryUrl, function(error, response, body){

    if(!error && response.statusCode === 200) {
      var artistData= JSON.parse(body);

      
      // console.log(artistData[0].venue.name);
      var queryUrlResults = 
      "Venue's Name: " + artistData[0].venue.name + "\n" +
      "Venue Location: " + artistData[0].venue.city + "\n" +
      "Date of the Event: " + moment(artistData[0].datetime).format("YYYY MM DD") + "\n" 
    
      console.log(queryUrlResults);

    }
    else{
      console.log("There was a error: " + error);
        return;
    }
  })


}

//request to OMDB API with the movie specified

function movieThis(movieName) {
  
  var movieName = process.argv[3];
  
  if(!movieName) {
    movieName ="Mr. Nobody";
  };

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {

    // if sucess which is 200
    if(!error && response.statusCode === 200) {

        //pulling request data with the following syntax
        var myMovieData = JSON.parse(body);
        var queryUrlResults =
          "Title: " + myMovieData.Title + "\n" + 
          "Year: " + myMovieData.Year + "\n" + 
          "IMDB Rated: " + myMovieData.Ratings[0].Value + "\n" + 
          "Rotten Tomatoes Rating: " + myMovieData.Ratings[1].Value + "\n" + 
          "Country Produced: " + myMovieData.Country + "\n" + 
          "Language: " + myMovieData.Language + "\n" + 
          "Plot: " + myMovieData.Plot + "\n" + 
          "Actors: " + myMovieData.Actors + "\n" 

        console.log(queryUrlResults);
    } else {
        console.log("There was a error: " + err);
        return;
    };
  
  });

}

function doWhatSays(){

  fs.readFile("random.txt", "utf-8", function(error, data) {
    if(!error) {
       console.log("\n"+ data);

       if(data.search("I Want it That Way"))
       {
        var trackName = "I Want it That Way";
        console.log(spotifyThisSong(trackName));
       }
       
    }else{
      console.log(error);
    }
  })


}