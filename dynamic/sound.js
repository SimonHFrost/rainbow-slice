var sound = {
  init : function() {
    dynamicSoundsAudio = document.createElement('audio');
    dynamicSoundsSource = document.createElement('source');
    dynamicSoundsSource.src = 'sound/playerHit.wav';
    dynamicSoundsAudio.appendChild(dynamicSoundsSource);

    themeAudio = document.createElement('audio');
    themeSource = document.createElement('source');
    themeSource.src = 'sound/theme.wav';
    themeAudio.appendChild(themeSource);
  },

  playHit : function(element) {
    if(!element.playedAudio && dynamicSoundsAudio.paused) {
      element.playedAudio = true;
      this.playDynamicSound('sound/playerHit.wav');
    }
  },

  playEnemyHit : function(element) {
    if(!element.playedAudio) {
      element.playedAudio = true;
      this.playDynamicSound('sound/enemyHit.wav');
    }
  },

  playWin : function() {
    this.playDynamicSound('sound/win.wav');
  },

  playDynamicSound : function(location) {
    dynamicSoundsSource.src = location;
    dynamicSoundsAudio.pause();
    dynamicSoundsAudio.load();
    dynamicSoundsAudio.play();
  },

  playTheme : function() {
    themeSource.src = 'sound/theme.wav';
    themeAudio.load();
    themeAudio.loop = true;
    if (!DEBUG_MODE)
      themeAudio.play();
  }
};
