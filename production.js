var http = require('http');
var static = require('node-static');
var socketIO = require('socket.io');

var folder = new(static.Server)('../public');
httpServer = http.createServer(function (request, response) {
  folder.serve(request, response);
}).listen(32491);

io = socketIO.listen(httpServer);

var connectionCount = 0;
io.sockets.on('connection', function (socket) {
  console.log('Client Connected!');
  connectionCount++;

  // socket.emit('connectionCount', { connectionCount: connectionCount });
  io.sockets.emit('connectionCount', { connectionCount: connectionCount });
});
