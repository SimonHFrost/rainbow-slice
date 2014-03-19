var story = {
  health : 1000,
  playedWin : false,

  triggerEnding : function() {
    if(!this.playedWin) {
      elem = document.getElementById('scoreNumber');
      elem.innerHTML = 'You won with ' + story.health + ' health left!';
      sound.playWin(this.playedWin);

      _.each(sceneObjects.allBullets, function(bullet) {
        scene.remove(bullet);
      });
    }
  }
};
