window.Story = (function () {
  "use strict";
  function Story(scene, network, sceneObjects) {
    this.scene = scene;
    this.network = network;
    this.sceneObjects = sceneObjects;

    this.health = 100;
    this.kills = 0;
    this.playedWin = false;
    this.playedDead = false;
  }

  Story.prototype.update = function() {
    if(this.health <= 0) {
      this.triggerDead();
    }
  };

  Story.prototype.decreaseHealth = function() {
    if (this.health > 0) {
      new Sound().playHit();
      this.health--;
      $('#healthNumber').html('Health: ' + this.health);
    }
  };

  Story.prototype.increaseKills = function() {
    new Sound().playEnemyHit();
    this.kills++;
    $('#killNumber').html('Kills: ' + this.kills);
  };

  // Not used atm
  Story.prototype.triggerWin = function() {
    var me = this;
    if(!this.playedWin) {
      this.playedWin = true;
      elem = document.getElementById('healthNumber');
      elem.innerHTML = 'You won with ' + story.health + ' health left!';
      new Sound().playWin();

      _gaq.push(['_trackEvent', 'GameEvents', 'Finished']);

      _.each(this.sceneObjects.allBullets, function(bullet) {
        me.scene.remove(bullet);
      });
    }
  };

  Story.prototype.triggerDead = function() {
    if(!this.playedDead) {
      this.playedDead = true;
      this.network.submitScore(this.kills);
      _gaq.push(['_trackEvent', 'GameEvents', 'Finished', this.kills]);
    }
  };

  return Story;
})();
