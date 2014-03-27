var story = {
  health : 250,
  playedWin : false,
  playedDead : false,

  triggerWin : function() {
    if(!this.playedWin) {
      this.playedWin = true;
      elem = document.getElementById('scoreNumber');
      elem.innerHTML = 'You won with ' + story.health + ' health left!';
      sound.playWin();

      _gaq.push(['_trackEvent', 'GameEvents', 'Finished']);

      _.each(sceneObjects.allBullets, function(bullet) {
        scene.remove(bullet);
      });
    }
  },

  triggerDead : function() {
    if(!this.playedDead) {
      this.playedDead = true;
      if (!DEBUG_MODE)
        location.reload();
    }
  }
};
