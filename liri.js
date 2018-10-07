require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var request = required("request");
var movieName = process.argv[3];
var liriReturn = process.argv[2];



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


  
}







