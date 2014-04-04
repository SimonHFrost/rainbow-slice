function Materials() {
  this.BASIC = new THREE.MeshLambertMaterial( { shading: THREE.SmoothShading, color: 0x000000 } );
  this.ENEMY = new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0xFFFFFF } );
  this.DEAD = new THREE.MeshBasicMaterial( { shading: THREE.SmoothShading, color: 0x000000 } );
  this.SKY = new THREE.MeshBasicMaterial( {color: 'black', side: THREE.BackSide} );
  this.GROUND = new THREE.MeshBasicMaterial( {shading: THREE.SmoothShading, color: 0x009933 });
  this.BULLET = new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0xFFFFFF } );
}
