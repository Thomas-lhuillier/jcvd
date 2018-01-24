## Installation
```bash
# Install dependencies.
npm install
# Create a config file and fill it with your twitter API credentials.
cp config/config.sample.js config/config.js
# Create the logs folder.
mkdir logs
```

## Launch the app
```
$ node jcvd.js
```

## Running it on a server
On a server, you can use pm2 to run the script and keep it alive permanently.

### Install pm2
```
$ npm install pm2 -g
```

### Start jcvd
```
$ npm run start
```

### Stop jcvd
```
$ npm run stop
```
