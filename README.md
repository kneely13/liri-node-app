# liri-node-app

**************************************************************************************************************************

# What this app does:

This app is a LIRI command line node app that takes in parameters and gives you back data. LIRI or (Language Interpretation and Recognition Interface) functions similar to the iPhone's (Speech Interpretation and Recognition Interface) aka SIRI. 

   *Look up Spotify for songs, Bands in Town for concerts, and OMDB for movie info.*

**************************************************************************************************************************

# How to use the app:

  # 1. Go to the console-terminal and follow the instructions below. 
        
        **OR**
        
  # 2. Type into the terminal the command:  node liri.js

            This will bring you directions and examples. 
       
       
     
  # For Spotify Information:  

   Type this command into the terminal:  node liri.js spotify-this-song 
  
  # For Movies Information:  

   Type this command into the terminal:  node liri.js movie-this
   
  # For Band Information:  

   Type this command into the terminal: node liri.js concert-this 

*************************************************************************************************************

# Steps taken to make this app 
 
1. Console logged: npm init -y- to initialize a *package.json* file for the project which is required for installing third party npm packages.

2. Made a .gitignore file including the appropriete code to be ignored by Github.

3. Made a JavaScript file named *keys.js*.

4. Next, created a file named *.env*, added: 

  # Spotify API keys

   SPOTIFY_ID=your-spotify-id **replaced this values with my API keys (no quotes).**
  SPOTIFY_SECRET=your-spotify-secret **replaced this values with my API keys (no quotes).**
  
  # TIP: If you want to clone this app from github and run it yourself, you need to supply your own .env file for it to work.
  
5. Made a file called *random.txt* including the following text:

        node liri.js spotify-this-song "I Want it That Way"

        node liri.js movie-this, "Searching"

        node liri.js concert-this "LCD Soundsystem"

6. Made a JavaScript file named *liri.js*

     Set any environment variables with the dotenv package using:
      
        require("dotenv").config();
         
7. Added code to require the *keys.js* file:
               
        var keys = require("./keys.js");
        
8. Added code to obtaian info form the *keys.js* file:
               
        var spotify = new Spotify(keys.spotify); 
        
9. Added code to require **fs** :       

       var fs = require("fs");
       
10. Added code to require the api information for spotify:

        var Spotify = require('node-spotify-api');

11. Added code to require request made:       

        var request = require("request");
        
13. Added code to require the moment package to find the date and time:

        var moment = require('moment');

14. Added arguments to place in each function so when the user consoles a certain request in the third argv, they trigger the following funcitons to run:

        var movieName = process.argv[3];
        var trackName = process.argv[3];
        var liriReturn = process.argv[2];
        
15. Added a case and break code to give different cases. These cases search for the console words written in the node argv location which is the argv[2] position.


      

