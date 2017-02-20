var fs = require('fs');
var ssl_server_key = 'server.key';
var ssl_server_crt = 'server.crt';

var PeerServer = require('peer').PeerServer;
//var server = PeerServer({port: 9000, path: '/peerjs'});

var server = PeerServer({
  port: 9000,
  path: '/peerjs',
  ssl: {
    key: fs.readFileSync(ssl_server_key),
    cert: fs.readFileSync(ssl_server_crt)
  }
});