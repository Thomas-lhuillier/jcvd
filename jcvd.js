const twit = require('twit');
const config = require('./config.js');

const Twitter = new twit(config);

const search = ['aware', 'Aware', 'AWARE'];

const stream = Twitter.stream('statuses/filter', { track: search, language: 'fr' });
// const stream = Twitter.stream('statuses/filter', { track: ['aware'] });

const me = {  
    id: 820078403504275458,
    screen_name: 'Bot_JCVD'
};

stream.on('error', (err) => {
  console.log('ERROR : steaming error ', err);
});

stream.on('tweet', (tweet) => {
  // console.log(tweet);
  console.log('==================');
  console.log('A tweet matched request.');

  // Do not retweet if original tweet is from me.
  if ( tweet.user.id != me.id ) {

    let random_response;
    let new_status;
    let tweet_id = tweet.id_str;

    if (citations.length) {
      random_response = citations[Math.floor(Math.random() * citations.length)];
      new_status = '@'+tweet.user.screen_name+' '+random_response;

      let response_text = tweet.text;

      let length = search.length;
      let is_string_matched = false;
      // Check if tweet strictly contains the 'aware' string.
      while(length--) {
        if (tweet.text.indexOf(search[length])!=-1) {
          is_string_matched = true;
          console.log('strictly contains at least one word');
        }
      }

      // Tweet.
      Twitter.post('statuses/update', {
          // status: 'RT @'+tweet.user.screen_name+' '+new_status,
          status: new_status,
          in_reply_to_status_id: tweet_id
      }, function(err, data, response) {
        console.log(err);
      });

      console.log('Tweeted !');
      console.log(tweet.user.screen_name);
      console.log(tweet.text);
      console.log(new_status);
    } else {
      console.log('ERROR : No citation provided.');
    }
  } else {
    console.log('ERROR : I‘m aware that original tweet was from me...');
  }
});

var citations = [
  "Moi, Adam et Eve, j’y crois plus tu vois, parce que je suis pas un idiot : la pomme ça peut pas être mauvais, c’est plein de pectine.",
  "Une femme qui est enceinte, par exemple, elle est aware qu‘elle attend un enfant...",
  "Marcel Proust, oui. Un peu comme moi. Longtemps il s'est couché aware.",
  "Quand tu joues au Go.. faut être aware. Si t'es pas aware, tes pierres sont mortes, et toi avec.",
  "La drogue, c'est comme quand tu close your eyes et que tu traverses la rue.",
  "Nous les humains, on a inventé le temps. Mais le temps n‘existe pas, car il y a une matter, une puissance de compression, qui n‘est pas la même pour chaque species on earth.",
  "Une noisette, j‘la casse entre mes fesses tu vois",
  "Je crois au moment. S‘il n‘y a pas le moment, à ce moment-là, il faut arriver à ce moment-là, au moment qu‘on veut",
  "Selon les statistiques, il y a une personne sur cinq qui est déséquilibrée. S'il y a 4 personnes autour de toi et qu'elles te semblent normales, c'est pas bon.",
  "Le monde est composé de flèches et de molécules, et d'électricité,comme le Big-Bang tu vois, et tout ça ensemble, ça forme l'Univers.",
  "Mes autres prénoms sont Camille et François. J'aime bien Camille, non ? Ça fait \"old fashion\", tu trouves pas ? Ça respire le meuble de Provence !",
  "Quand on sort d'un placenta à l'age de 42 ans et quand on a l'intelligence, le brain, le computer, la mémoire d'un 40 ans mais qui est vide, elle doit se remplir de jour en jour, elle doit sponging, elle doit elle doit prendre comme une éponge, elle doit elle doit... ok ?",
  "L'être humain, en général, dans la vie, réacte. On réacte, c'est à dire qu'on fait ce qu'on est supposé faire. Travailler, manger... J'm'excuse de l'expression; chier, mais je trouve qu'un être humain doit créer.",
  "Une vache, ça te bouffe trois hectares, moi, avec trois hectares, je te fais deux mille kilos de riz... avec trois hectares, je te nourris Avignon, tu vois...",
];