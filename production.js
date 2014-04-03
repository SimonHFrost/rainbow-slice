var http = require("http");
var static = require('node-static');

var fileServer = new static.Server('../public');

http.createServer(function(request, response) {
  fileServer.serve(request,response);
}).listen(32491);
