var sound = {
  audio : '',
  source: '',

  init : function() {
    audio = document.createElement('audio');
    source = document.createElement('source');
    source.src = 'sound/playerHit.wav';
    audio.appendChild(source);
  },

  playHit : function(element) {
    if(!element.playedAudio && audio.paused) {
      element.playedAudio = true;
      source.src = 'sound/playerHit.wav';
      audio.pause();
      audio.load();
      audio.play();
    }
  },

  playEnemyHit : function(element) {
    if(!element.playedAudio) {
      element.playedAudio = true;
      source.src = 'sound/enemyHit.wav';
      audio.pause();
      audio.load();
      audio.play();
    }
  },

  playWin : function() {
    if(!story.playedWin) {
      story.playedWin = true;
      source.src = 'sound/win.wav';
      audio.pause();
      audio.load();
      audio.play();
    }
  }
};
