const twit = require('twit');
const config = require('./config.js');

const Twitter = new twit(config);

// var stream = Twitter.stream('statuses/filter', { track: ['aware'], language: 'fr' });
const stream = Twitter.stream('statuses/filter', { track: ['aware'] });

const me = {  
    id: 2388035312,
    screen_name: 'ThomasLhui'
};

stream.on('tweet', (tweet) => {

    if ( tweet.user.id != me.id ) {

      let random_response;
      let response_status;

      if (citations.length) {
        random_response = citations[Math.floor(Math.random() * citations.length)];
        response_status = random_response;
      }

      let response_text = tweet.text;

      if ( response_text.includes('aware') ) {

        Twitter.post('statuses/update', {
            status: 'RT @'+tweet.user.screen_name+' '+response_status,
            in_reply_to_status_id: tweet.id_str
        });

        console.log(tweet.user.screen_name);
        console.log(response_status);
      }
    }

});



var citations = [
  "Moi, Adam et Eve, j’y crois plus tu vois, parce que je suis pas un idiot : la pomme ça peut pas être mauvais, c’est plein de pectine.",
  "Une femme qui est enceinte, par exemple, elle est aware qu‘elle attend un enfant...",
  "Nous les humains, on a inventé le temps. Mais le temps n‘existe pas, car il y a une matter, une puissance de compression, qui n‘est pas la même pour chaque species on earth.",
  "Une noisette, j‘la casse entre mes fesses tu vois",
  "Je crois au moment. S‘il n‘y a pas le moment, à ce moment-là, il faut arriver à ce moment-là, au moment qu‘on veut",
  "Selon les statistiques, il y a une personne sur cinq qui est déséquilibrée. S'il y a 4 personnes autour de toi et qu'elles te semblent normales, c'est pas bon.",
  "Le monde est composé de flèches et de molécules, et d'électricité,comme le Big-Bang tu vois, et tout ça ensemble, ça forme l'Univers.",
  "Mes autres prénoms sont Camille et François. J'aime bien Camille, non ? Ça fait \"old fashion\", tu trouves pas ? Ça respire le meuble de Provence !",
];