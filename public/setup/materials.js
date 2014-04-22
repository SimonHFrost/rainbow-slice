function Materials() {
  var floorTexture = THREE.ImageUtils.loadTexture('./img/grass.png');
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(4, 4);

  Materials.GRASS = new THREE.MeshLambertMaterial({map: floorTexture});
}

Materials.BASIC = new THREE.MeshLambertMaterial( { shading: THREE.SmoothShading, color: 0x000000 } );
Materials.ENEMY = new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0xFFFFFF } );
Materials.DEAD = new THREE.MeshBasicMaterial( { shading: THREE.SmoothShading, color: 0x000000 } );
Materials.SKY = new THREE.MeshBasicMaterial( {color: 'black', side: THREE.BackSide} );
Materials.GROUND = new THREE.MeshBasicMaterial( {shading: THREE.SmoothShading, color: 0x009933 });
Materials.BULLET = new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0xFFFFFF } );
