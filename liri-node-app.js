
var keys = require('./keys.js');
var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('spotify');
var omdb = require('omdb');
var request = require('request');
var input1 = process.argv[2];
var input2 = process.argv.splice(3).join(" ");

function log() {

    fs.appendFile('./log.txt', input1 + " " + input2 + ", ", function(err) {

        // log if err is experienced.
        if (err) {
            console.log(err);
        }

        // no error reports "Content Added" to our node console.
        else {
            
        }

    });
};


var client = new Twitter(keys.twitterKeys);

var params = {
    screen_name: 'carolmunene',
    inputs,
    count: 20
};

function twitter(inputs) {
    var params = {screen_name: inputs, count: 20};
    
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for (i = 0; i < tweets.length; i ++){
                    console.log("Tweet: " + "'" + tweets[i].text + "'" + " Created At: " + tweets[i].created_at);
                }
            } else {
                console.log(error);
            }
        });

}

function spotify(inputs) {

    var spotify = new Spotify(keys.spotifyKeys);
        if (!inputs){
            inputs = 'The Sign';
        }
        spotify.search({ type: 'track', query: inputs }, function(err, data) {
            if (err){
                console.log('Error occurred: ' + err);
                return;
            }

            var songInfo = data.tracks.items;
            console.log("Artist(s): " + songInfo[0].artists[0].name);
            console.log("Song Name: " + songInfo[0].name);
            console.log("Preview Link: " + songInfo[0].preview_url);
            console.log("Album: " + songInfo[0].album.name);
    });
}


function movie(inputs) {

    var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {
        if (!inputs){
            inputs = 'Mr Nobody';
        }
        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
};

function doit() {
    fs.readFile('random.txt', "utf8", function(error, data){

        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // Each command is represented. Because of the format in the txt file, remove the quotes to run these commands. 
        if (dataArr[0] === "spotify-this-song") {
            var songcheck = dataArr[1].slice(1, -1);
            spotify(songcheck);
        } else if (dataArr[0] === "my-tweets") {
            var tweetname = dataArr[1].slice(1, -1);
            twitter(tweetname);
        } else if(dataArr[0] === "movie-this") {
            var movie_name = dataArr[1].slice(1, -1);
            movie(movie_name);
        } 
        
    });

};


// Consumer API keys
// g2ON3Q9jykAqEn3a4pccYtiyI (API key)

// TTb8HQkWDAna1W8OD2rnn1nLTi2JAuPQB6uDD4rIseUwZTALYw



