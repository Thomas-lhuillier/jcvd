## Installation
```bash
# Install dependencies.
npm install
# Create a config file and fill it with your twitter API credentials.
cp config/config.sample.js config/config.js
# Create the logs folder.
mkdir logs
```

## launch our script
```
node jcvd
```

On a server, you can use Forever to run the script permanently.
`forever start -w jcvd.js` to start the script, -w to watch for file changes.
`forever list` to see running processes informations.
