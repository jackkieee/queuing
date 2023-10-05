const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const errorhandler = require('errorhandler');
const path = require('path');
const app = express();
let server = http.createServer(app);

require('dotenv').config();

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV == 'production';

if (!isProduction) {
  app.use(errorhandler())
}

app.use(express.static(publicPath));

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Server listening on port ${ port }…`);
});

module.exports.io = socketIO(server);
require('./sockets/socket');
