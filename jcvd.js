// Our twitter connection informations :
const config = require('./config.js');
const fs = require('fs');

// The sentences our bot will say :
const citations = require('./citations.js');
const log = {};

// Previously, in JCVD BOT
try {
  const log = require( "./log.json" )
}
catch (e) {
  console.log('Pas encore de fichier de log');
}


var Twitter;
var stream;
// The strings we'll be tracking :
const search = ['aware', 'Aware', 'AWARE', 'love', 'Love', 'LOVE'];

// Initialize twitter streaming.
(function init_JCVD() {
  console.log('Starting JCVD...')
  const twit = require('twit');
  Twitter = new twit(config);
  stream = Twitter.stream('statuses/filter', { track: search, language: 'fr' });
})();

function send_tweet(text, original_tweet_id) {
  Twitter.post('statuses/update', {
    status: text,
    in_reply_to_status_id: original_tweet_id
  }, function(err, data, response) {
    if (err) {
      console.log(err);
      throw err;
    }
  });
}

function save_json(text){
  console.log(text);
  let json = JSON.stringify(text);
  fs.writeFile("log.json", json, (err) => {
    if (err) throw err;
  console.log('JSON updated');
});
}

stream.on('error', (err) => {
  console.log('Error : streaming error -> ', err);
});

stream.on('tweet', (tweet) => {
  console.log('__________');
  let time = new Date();
  console.log(time);
  console.log(tweet.user.screen_name);
  console.log(tweet.text);
  // console.log(tweet);

  // Do not retweet if original tweet is from me.
  if ( tweet.user.id == config.id ) {
    console.log('Aborting: original tweet is our. :(');
    return;
  }

  // Do not retweet if already responded this user
  if (log[tweet.user.id] != undefined) {
    console.log('Aborting: already responded to this guy');
    return;
  }

  let response = false;
  //let prefix = '@'+tweet.user.screen_name+' ';
  let suffix = ' @' + tweet.user.screen_name;
  let available_length = 140 - suffix.length;

  if (citations.length) {
    // Find a sentence that allow '@name sentence' <= 140 char.
    while (!response) {
      let temp_sentence = citations[Math.floor(Math.random() * citations.length)];
      let temp_response = temp_sentence + suffix;
      if ( temp_response.length > 140 ) {
        continue;
      } else {
        response = temp_response;
      }
    }

    let length = search.length;
    let is_string_matched = false;

    // Check if tweet strictly contains a least one word of our search
    while (length--) {
      if ( tweet.text.indexOf(search[length]) != -1 ) { is_string_matched = true; }
    }

    if (is_string_matched) {
      // Tweet.
      //send_tweet(response, tweet.id_str);
      log[tweet.user.id] = new Date().getTime();
      save_json(log);
      console.log(response);
    } else {
      console.log('Aborting: Tweet did not strictly contained a searched word.');
    }
  } else {
    console.log('Error : No citation provided.');
  }
});
