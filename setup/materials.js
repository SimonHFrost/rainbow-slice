var materials = {
  BASIC: new THREE.MeshLambertMaterial( { shading: THREE.SmoothShading, color: 0x000000 } ),
  ENEMY: new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0xFFFFFF } ),
  DEAD: new THREE.MeshBasicMaterial( { shading: THREE.FlatShading, color: 0xFF0077 } ),
  SKY: new THREE.MeshBasicMaterial( {color: 'black', side: THREE.BackSide} ),
  GROUND: new THREE.MeshBasicMaterial( {shading: THREE.SmoothShading, color: 0x009933 }),
  BULLET: new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0xFFFFFF } )
};
