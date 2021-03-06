var http = require('http');
var static = require('node-static');
var socketIO = require('socket.io');

var config = require('./config');
var port = config.PORT;
var publicFolder = config.PUBLIC_FOLDER_LOCATION;

var folder = new(static.Server)(publicFolder);
httpServer = http.createServer(function (request, response) {
  folder.serve(request, response);
}).listen(port);

console.log('Started server on port ' + port);

io = socketIO.listen(httpServer);
io.set('transports', ['xhr-polling']);

var connectionCount = 0;
var scores = [];
io.sockets.on('connection', function (socket) {
  console.log('Client Connected!');
  connectionCount++;

  socket.on('submitScore', function (data) {
    console.log('RecievedScore: ' + data.score);
    scores.push(data.score);
    socket.emit('receivedScore');
  });

  io.sockets.emit('connectionCount', { connectionCount: connectionCount });
  socket.emit('scores', {scores: scores});
});
