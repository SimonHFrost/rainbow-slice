var story = {
  triggerEnding : function() {
    elem = document.getElementById('scoreNumber');
    elem.innerHTML = 'You won with ' + collisionDetector.health + ' health left!';

    _.each(fire.allBullets, function(bullet) {
      scene.remove(bullet);
    });
  }
};
