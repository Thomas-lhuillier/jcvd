const log = require( "./log.json" )
const moment = require('moment');
const fs = require('fs');
gi
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
                console.log('Supprime: poste il y a ' + moment.duration(delta, "seconds").humanize())

            }
            else { console.log('Non supprime: poste il y a ' + moment.duration(delta, "seconds").humanize())}
        }
    console.log('Termine: ' + nblines + ' lignes supprimees')
    save_json(log)
}
clean();

function save_json(text){
    console.log(text);
    let json = JSON.stringify(text);
    fs.writeFile("log.json", json, (err) => {
        if (err) throw err;
    console.log('JSON updated');
});
}