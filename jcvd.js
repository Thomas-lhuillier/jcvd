// @TODO ne pas cibler les retweets, du moins ceux dont je suis l'original.


// Our twitter connection informations :
const config = require('./config.js');

// The sentences our bot will say :
const citations = require('./citations.js');

var stream;
// The strings we'll be tracking :
const search = ['aware', 'Aware', 'AWARE',
'salut', 'bonsoir', 'petit'];

// Initialize twitter streaming.
(function init_JCVD() {
  console.log('Starting JCVD...')
  const twit = require('twit');
  const Twitter = new twit(config);
  stream = Twitter.stream('statuses/filter', { track: search, language: 'fr' });
})();

function send_tweet(text, original_tweet_id) {
  Twitter.post('statuses/update', {
    status: text,
    in_reply_to_status_id: original_tweet_id
  }, function(err, data, response) {
    console.log(err);
  });
}

stream.on('error', (err) => {
  console.log('Error : streaming error -> ', err);
});

stream.on('tweet', (tweet) => {
  console.log('__________');
  // console.log(tweet);

  // Do not retweet if original tweet is from me.
  if ( tweet.user.id == config.id ) {
    console.log('Aborting: original tweet is our. :(');
    return;
  }

  let response = false;
  let prefix = '@'+tweet.user.screen_name+' ';
  let available_length = 140 - prefix.length;

  if (citations.length) {
    // Find a sentence that allow '@name sentence' <= 140 char.
    while(!response) {
      let temp_sentence = citations[Math.floor(Math.random() * citations.length)];
      let temp_response = prefix + temp_sentence;
      if ( temp_response.length > 140 ) {
        continue;
      } else {
        response = temp_response;
      }
    }

    let length = search.length;
    let is_string_matched = false;

    // Check if tweet strictly contains a least one word of our search
    while(length--) {
      if (tweet.text.indexOf(search[length])!=-1) { is_string_matched = true; }
    }

    if (is_string_matched) {
      // Tweet.
      send_tweet(response, tweet.id_str);

      // console.log('Tweeted. :)');
      let time = new Date();
      console.log(time);
      console.log(tweet.user.screen_name);
      console.log(tweet.text);
      console.log(response);
    } else {
      console.log('Aborting: Tweet did not strictly contained a searched word.');
    }
  } else {
    console.log('Error : No citation provided.');
  }
});
