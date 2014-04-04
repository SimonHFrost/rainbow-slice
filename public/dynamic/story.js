function Story() {
  this.health = 250;
  this.playedWin = false;
  this.playedDead = false;
}

Story.prototype.triggerWin = function() {
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
};

Story.prototype.triggerDead = function() {
  if(!this.playedDead) {
    this.playedDead = true;
    if (!DEBUG_MODE)
      location.reload();
  }
};
