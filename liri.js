require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var movieName = process.argv[3];
var liriReturn = process.argv[2];

switch(liriReturn)
{
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
    "Type one of the phrases into the terminal: "+"\n"+
    "\nnode liri.js concert-this " +
    "\nnode liri.js spotify-this-song "+
    "\nnode liri.js movie-this "+
    "\nnode liri.js do-what-it-says "+"\n"+"\n"+
    "If you like to be specific you can add more info"+"\n"+
    "\nnode liri.js concert-this <artist/band name here> " +
    "\nnode liri.js spotify-this-song '<any song name here>' (TIP: Use quotes for multiword song titles!!!)"+
    "\nnode liri.js movie-this '<any movie name here>' "+
    "\nnode liri.js do-what-it-says "+"\n"); 
};

var spotifyThisSong = function(songName){
  var songName = process.argv[3];
  
  if(!songName){
    songName="The Sign";
  };
  sonfRequest = songName;
  spotify.search({
    type: "track",
    query: "songRequest",
  }),
    function (err, data) 
    {
      if(!err)
      {
        var songInfo = data.songs.items;
        for(var i=0;i<5;i++)
        {
          if(songInfo[i] !== undefined) {
            var spotifyResults =
            "Artist:" +songInfo[i].artists[0].name + "\n" + 
            "Song: " + songInfo[i].name +
            "\n" +
            "Preview URL: "+ songInfo[i].preview_url + "\n" +
            "Album: " + songInfo[i].album.name + "\n"

            console.log(spotifyResults);
            console.log('------------------')
             
          };
        };
      }
      else
      {
        console.log("There was a error: " + err);
        return;
      };
    }

};

//request to OMDB API with the movie specified

function movieThis()
{
  var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"

  request(queryURL, function (error, response, body)
  {

    // if sucess which is 200
    if(!error && response.statusCode === 200) {

        //pulling request data with the following syntax
        var myMovieData = JSON.parse(body);
        var queryURLResults =
        "Title: " + myMovieData.Title + "\n" + 
        "Year: " + myMovieData.Year + "\n" + 
        "IMDB Rated: " + myMovieData.Ratings[0].Value + "\n" + 
        "Rotten Tomatoes Rating: " + myMovieData.Ratings[1].Value + "\n" + 
        "Country Produced: " + myMovieData.Country + "\n" + 
        "Language: " + myMovieData.Language + "\n" + 
        "Plot: " + myMovieData.Plot + "\n" + 
        "Actors: " + myMovieData.Actors + "\n" 

        console.log(queryURLResults);
    }
    else
    {
        console.log("There was a error: " + err);
        return;
    };
  
  }

)}

