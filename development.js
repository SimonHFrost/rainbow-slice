var http = require('http'),
  static = require('node-static');

var fileServer = new static.Server('./public');

var folder = new(static.Server)('./public');
console.log('Server started on port 8080');

http.createServer(function (request, response) {
  console.log('Request made: ' + request);
  folder.serve(request, response);
}).listen(8080);
