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
      dynamicSoundsSource.src = 'sound/playerHit.wav';
      dynamicSoundsAudio.pause();
      dynamicSoundsAudio.load();
      dynamicSoundsAudio.play();
    }
  },

  playEnemyHit : function(element) {
    if(!element.playedAudio) {
      element.playedAudio = true;
      dynamicSoundsSource.src = 'sound/enemyHit.wav';
      dynamicSoundsAudio.pause();
      dynamicSoundsAudio.load();
      dynamicSoundsAudio.play();
    }
  },

  playWin : function() {
    if(!story.playedWin) {
      story.playedWin = true;
      dynamicSoundsSource.src = 'sound/win.wav';
      dynamicSoundsAudio.pause();
      dynamicSoundsAudio.load();
      dynamicSoundsAudio.play();
    }
  },

  playTheme : function() {
    themeSource.src = 'sound/theme.wav';
    themeAudio.load();
    themeAudio.loop = true;
    themeAudio.play();
  }
};
