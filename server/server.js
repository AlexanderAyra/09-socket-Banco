const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const http = require('http');
const path = require('path');


let app = express();

let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');

const port = process.env.PORT || 3000;


var whitelist = ['http://localhost:3000']

var corsOptions = {
    origin: (origin, callback) => {
        callback(null, true)
    }
}

app.use(cors(corsOptions));


app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');


server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});