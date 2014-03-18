var story = {
  health : 1000,

  triggerEnding : function() {
    elem = document.getElementById('scoreNumber');
    elem.innerHTML = 'You won with ' + story.health + ' health left!';

    _.each(sceneObjects.allBullets, function(bullet) {
      scene.remove(bullet);
    });
  }
};
