window.Sound = (function () {
  "use strict";
  function Sound() {
    var dynamicSoundsAudio = document.createElement('audio');
    var dynamicSoundsSource = document.createElement('source');
    dynamicSoundsSource.src = 'sound/playerHit.wav';
    dynamicSoundsAudio.appendChild(dynamicSoundsSource);
    this.dynamicSoundsAudio = dynamicSoundsAudio;
    this.dynamicSoundsSource = dynamicSoundsSource;

    var themeAudio = document.createElement('audio');
    var themeSource = document.createElement('source');
    themeSource.src = 'sound/theme.wav';
    themeAudio.appendChild(themeSource);

    this.themeAudio = themeAudio;
    this.themeSource = themeSource;
  }

  Sound.prototype.playHit = function() {
    this.playDynamicSound('sound/playerHit.wav');
  };

  Sound.prototype.playEnemyHit = function() {
    this.playDynamicSound('sound/enemyHit.wav');
  };

  Sound.prototype.playWin = function() {
    if(!element.playedAudio) {
      elemnt.playedAudio = true;
      this.playDynamicSound('sound/win.wav');
    }
  };

  Sound.prototype.playDynamicSound = function(location) {
    this.dynamicSoundsSource.src = location;
    this.dynamicSoundsAudio.pause();
    this.dynamicSoundsAudio.load();
    this.dynamicSoundsAudio.play();
  };

  Sound.prototype.playTheme = function() {
    this.themeSource.src = 'sound/theme.wav';
    this.themeAudio.load();
    this.themeAudio.loop = true;
    if (!Main.DEBUG_MODE) {
      this.themeAudio.play();
    }
  };

  return Sound;
})();
