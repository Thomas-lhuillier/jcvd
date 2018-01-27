
const config = require('./config/config'); // Our twitter connection informations
const citations = require('./config/citations'); // The sentences our bot will say

// Start logger
const JsonLogger = require('./jsonLogger');
const logger = new JsonLogger('./logs/log.json', 30); // clears entries older that 30 days

// Init a connection to Twitter and listen to stream
const Twit = require('twit');
const Twitter = new Twit(config);
const search = ['aware', 'Aware', 'AWARE']; // The strings we'll be tracking
const stream = Twitter.stream('statuses/filter', {
  track: search,
  language: 'fr',
});

stream.on('error', (err) => {
  console.log('Error :', err);
});

stream.on('tweet', (tweet) => {
  console.log(logger.getTimeSinceLastEntry());
  // return;
  // @TODO cut in two sections, getTweet and createResponse
  if (!citations.length) {
    console.log('Error : No citation provided.');
  }

  let date = Math.floor(Date.now() / 1000);
  let userId = tweet.user.id;
  console.log('usrId:', userId);
  console.log('text:', tweet.text);

  // Do not retweet if original tweet is from me.
  if ( tweet.user.id == config.id ) {
    return;
  }

  // Do not retweet if we already responded to this user.
  let log = logger.getData();
  if (typeof log.data[tweet.user.id] !== 'undefined') {
    return;
  }

  // Check if tweet strictly contains a least one word of our search, else abort.
  // Sometimes the stream can send related post else abort.
  let isStringMatched = false;
  let length = search.length;
  while (length--) {
    if (tweet.text.indexOf(search[length]) != -1 ) {
      isStringMatched = true;
    }
  }
  if (!isStringMatched) {
    return;
  }

  // @TODO improve bot, trying to provide a sentence related to the user's twit (contains same words ?).
  // Find a sentence that allow '@username ' + sentence <= 140 chars. twit limitge
  // let prefix = '@' + tweet.user.screen_name+' ';
  let suffix = ' @' + tweet.user.screen_name;
  let response = false;
  while (!response) {
    let tempSentence = citations[Math.floor(Math.random() * citations.length)];
    let tempResponse = tempSentence + suffix;
    if ( tempResponse.length > 140 ) {
      continue;
    } else {
      response = tempResponse;
    }
  }

  // Max out twit frenquency to 30min max
  // @TODO make those functions async.
  let timeSinceLastTwit = logger.getTimeSinceLastEntry();
  if ( timeSinceLastTwit === null || timeSinceLastTwit > (1800000)) { // 1800000ms = 30min
    // Tweet.
    sendTweet(response, tweet.id_str);
    console.log('sendtweet');
    logger.addRecord(userId, date);
    console.log('__________');
    console.log(tweet.text);
    console.log(response);
  }
});

/**
 * @param {string} text
 * @param {int} originalTweetID
 */
function sendTweet(text, originalTweetID) {
  Twitter.post('statuses/update', {
    status: text,
    in_reply_to_status_id: originalTweetID,
  }, function(err, data, response) {
    if (err) {
      console.log(err);
      throw err;
    }
  });
}
