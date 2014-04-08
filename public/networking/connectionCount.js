function ConnectionCount(connectionCount) {
  var socket;
  if(Main.DEBUG_MODE) {
    socket = io.connect('http://localhost');
  } else {
    socket = io.connect('http://rainbowslice.com');
  }
  socket.on('connectionCount', function (data) {
    console.log(data.connectionCount + ' players have connected.');
    connectionCount.html(data.connectionCount + ' connections');
  });
}
