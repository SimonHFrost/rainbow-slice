var materials = {
  BASIC: new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0xFF00FF } ),
  ENEMY: new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0xFFFFFF } ),
  DEAD: new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0xFF0000 } ),
  SKY: new THREE.MeshBasicMaterial( {color: 'black', side: THREE.BackSide} ),
  GROUND: new THREE.MeshBasicMaterial( {shading: THREE.SmoothShading, color: 0x009933 }),
  BULLET: new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0xFFFFFF } ),
};
