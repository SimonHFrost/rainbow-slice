window.Sound = (function () {
  "use strict";
  function Sound() {
    this.initializeDynamicSource();
    this.initializeThemeSource();
  }

  Sound.prototype.initializeDynamicSource = function() {
    this.dynamicSoundsSource = document.createElement('source');

    this.dynamicSoundsAudio = document.createElement('audio');
    this.dynamicSoundsAudio.appendChild(this.dynamicSoundsSource);
  }

  Sound.prototype.initializeThemeSource = function() {
    this.themeSource = document.createElement('source');

    this.themeAudio = document.createElement('audio');
    this.themeAudio.appendChild(this.themeSource);
  }

  Sound.prototype.playHit = function() {
    this.playDynamicSound('resources/sound/playerHit.wav');
  };

  Sound.prototype.playEnemyHit = function() {
    this.playDynamicSound('resources/sound/enemyHit.wav');
  };

  Sound.prototype.playWin = function(element) {
    if(!element.playedAudio) {
      element.playedAudio = true;
      this.playDynamicSound('resources/sound/win.wav');
    }
  };

  Sound.prototype.playDynamicSound = function(location) {
    this.dynamicSoundsSource.src = location;
    this.dynamicSoundsAudio.pause();
    this.dynamicSoundsAudio.load();
    this.dynamicSoundsAudio.play();
  };

  Sound.prototype.playTheme = function() {
    this.themeSource.src = 'resources/sound/theme.wav';
    this.themeAudio.load();
    this.themeAudio.loop = true;
    if (!Main.DEBUG_MODE) {
      this.themeAudio.play();
    }
  };

  return Sound;
})();
