function Sound() {
  dynamicSoundsAudio = document.createElement('audio');
  dynamicSoundsSource = document.createElement('source');
  dynamicSoundsSource.src = 'sound/playerHit.wav';
  dynamicSoundsAudio.appendChild(dynamicSoundsSource);

  themeAudio = document.createElement('audio');
  themeSource = document.createElement('source');
  themeSource.src = 'sound/theme.wav';
  themeAudio.appendChild(themeSource);
}

Sound.prototype.playHit = function(element) {
  if(!element.playedAudio) {
    element.playedAudio = true;
    this.playDynamicSound('sound/playerHit.wav');
  }
};

Sound.prototype.playEnemyHit = function(element) {
  if(!element.playedAudio) {
    element.playedAudio = true;
    this.playDynamicSound('sound/enemyHit.wav');
  }
};

Sound.prototype.playWin = function() {
  if(!element.playedAudio) {
    elemnt.playedAudio = true;
    this.playDynamicSound('sound/win.wav');
  }
};

Sound.prototype.playDynamicSound = function(location) {
  dynamicSoundsSource.src = location;
  dynamicSoundsAudio.pause();
  dynamicSoundsAudio.load();
  dynamicSoundsAudio.play();
};

Sound.prototype.playTheme = function() {
  themeSource.src = 'sound/theme.wav';
  themeAudio.load();
  themeAudio.loop = true;
  if (!Main.DEBUG_MODE)
    themeAudio.play();
};
