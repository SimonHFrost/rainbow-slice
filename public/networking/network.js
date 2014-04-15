function Network(connectionCount) {
  if(Main.DEBUG_MODE) {
    this.socket = io.connect('http://localhost');
  } else {
    this.socket = io.connect('http://rainbowslice.com');
  }
  this.socket.on('connectionCount', function (data) {
    console.log(data.connectionCount + ' players have connected.');
    connectionCount.html(data.connectionCount + ' connections');
  });

  this.socket.on('scores', function(data) {
    var sortedScores = data.scores.sort(function(a,b){return b-a;});
    var top5 = sortedScores.slice(0,5);
    var top5Elements = _.map(top5, function(theElement) {
      var theNode = $('<p>' + theElement + '</p>');
      theNode.addClass('uiText');
      return theNode;
    });

    $('#scores').append(top5Elements);
  });

  this.socket.on('receivedScore', function() {
    location.reload();
  });
}

Network.prototype.submitScore = function(score) {
  this.socket.emit('submitScore', { score: score });
};
