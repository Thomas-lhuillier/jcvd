const log = require( "./log.json" )
const moment = require('moment');
const nbjours = 30;
let time = Math.floor(Date.now() / 1000);
console.log('Time: ' + time)
let nblines = 0;
function clean(){
        for(var key in log) {
            let delta = time - log[key]
            if ( delta > (nbjours * 86400)){
                delete log[key];
                nblines++

            }
            else { console.log('Non supprime: poste il y a ' + moment.duration(delta, "seconds").humanize())}
        }
    console.log('Termine: ' + nblines + ' lignes supprimees')
}
clean();