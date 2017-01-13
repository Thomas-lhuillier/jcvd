var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

// var stream = Twitter.stream('statuses/filter', { track: ['42'] });
var stream = Twitter.stream('statuses/filter', { track: ['42'], language: 'en' });
 
stream.on('tweet', function (tweet) {
	// console.log(tweet);
  console.log("~~~~~~");
  console.log(tweet.user.screen_name);
  console.log(tweet.text);
});