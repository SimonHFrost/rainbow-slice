window.Story = (function () {
  "use strict";
  function Story(scene, network, allBullets, sound) {
    this.scene = scene;
    this.network = network;
    this.allBullets = allBullets;
    this.sound = sound;

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
      this.sound.playHit();
      this.health--;
      $('#healthNumber').html('Health: ' + this.health);
    }
  };

  Story.prototype.increaseKills = function() {
    this.sound.playEnemyHit();
    this.kills++;
    $('#killNumber').html('Kills: ' + this.kills);
  };

  // Not used atm
  Story.prototype.triggerWin = function() {
    var me = this;
    if(!this.playedWin) {
      this.playedWin = true;
      elem = document.getElementById('healthNumber');
      elem.innerHTML = 'You won with ' + this.story.health + ' health left!';
      this.sound.playWin();

      _gaq.push(['_trackEvent', 'GameEvents', 'Finished']);

      _.each(this.allBullets, function(bullet) {
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
