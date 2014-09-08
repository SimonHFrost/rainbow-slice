window.Materials = (function() {
  "use strict";
  function Materials() {
    this.GRASS = this.makeTexturedMaterial('./resources/img/grass.png');
    this.SEA = this.makeTexturedMaterial('./resources/img/sea.png');
    this.SKY = this.makeTexturedMaterial('./resources/img/sky.png');
    this.SKY.side = THREE.BackSide;

    var wallTexture = THREE.ImageUtils.loadTexture('./resources/img/rock.png');
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(1, 16);

    Materials.WALL = new THREE.MeshLambertMaterial({map: wallTexture});
  }

  Materials.prototype.makeTexturedMaterial = function(textureLocation) {
    var texture = THREE.ImageUtils.loadTexture(textureLocation);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);

    return new THREE.MeshLambertMaterial({map: texture});
  };
  return Materials;
})();
