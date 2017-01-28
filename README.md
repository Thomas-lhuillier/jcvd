## Installation
```
npm install twit
npm install moment
```
Then edit the config.js file to set your credentials for the twitter API to work.

## launch our script
```
node jcvd.js
```

On a server, you can use Forever to run the script permanently.  
`forever start -w jcvd.js` to start the script, -w to watch for file changes.  
`forever list` to see running processes informations.  
