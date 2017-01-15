const twit = require('twit');
const moment = require('moment');
const config = require('./config.js');

const Twitter = new twit(config);

const stream = Twitter.stream('statuses/filter', { track: ['aware', 'Aware', 'AWARE'], language: 'fr' });
// const stream = Twitter.stream('statuses/filter', { language: 'fr' });

stream.on('tweet', (tweet) => {

  let tweet_timestamp = tweet.timestamp_ms;
  
  var d1 = new Date();
  var d2 = new Date(tweet_timestamp);

  console.log(moment(tweet.created_at).fromNow());

  // console.log(tweet);
  
  console.log('==================');
  console.log(tweet.user.screen_name);
  console.log(tweet.text);
});