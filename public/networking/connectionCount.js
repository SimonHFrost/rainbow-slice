function ConnectionCount(connectionCount) {
  var socket = io.connect('http://localhost');
  socket.on('connectionCount', function (data) {
    console.log(data.connectionCount + ' players have connected.');
    connectionCount.html(data.connectionCount + ' connections');
  });
}
