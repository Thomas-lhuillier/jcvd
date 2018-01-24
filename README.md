## Installation
```
# Install dependencies
$ npm install
# Create log folder
$ mkdir logs
```
Duplicate and fill config.sample.js file to set your twitter API credentials.

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
