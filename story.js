var story = {
  triggerEnding : function() {
    elem = document.getElementById('scoreNumber');
    elem.innerHTML = 'You won with ' + boundryCollisionDetector.health + ' health left!';

    _.each(sceneObjects.allBullets, function(bullet) {
      scene.remove(bullet);
    });
  }
};
