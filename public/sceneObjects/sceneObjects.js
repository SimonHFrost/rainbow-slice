var sceneObjects = {
  allBullets : [],
  player : '',
  playerModel: '',
  enemies : [],
  morphs : [],

  removeBullet : function(threeObject) {
    var bullet = _.find(sceneObjects.allBullets, function(element) {
      return element.threeObject === threeObject;
    });

    var index = sceneObjects.allBullets.indexOf(bullet);
    sceneObjects.allBullets.splice(index, 1);
  }
};
