## Installation
```
npm install
```
Duplicate and fill config.sample.js file to set your twitter API credentials.

## launch our script
```
node jcvd.js
```

On a server, you can use Forever to run the script permanently.
`forever start -w jcvd.js` to start the script, -w to watch for file changes.
`forever list` to see running processes informations.
