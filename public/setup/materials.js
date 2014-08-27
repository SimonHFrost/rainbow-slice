window.Materials = (function() {
  function Materials() {
    Materials.GRASS = this.makeTexturedMaterial('./resources/img/grass.png');
    Materials.SEA = this.makeTexturedMaterial('./resources/img/sea.png');
    Materials.SKY = this.makeTexturedMaterial('./resources/img/sky.png');
    Materials.SKY.side = THREE.BackSide;

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

  Materials.GROUND = new THREE.MeshBasicMaterial( {shading: THREE.SmoothShading, color: 0x009933 });
  Materials.BULLET = new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0xFFFFFF } );

  return Materials;
})();
