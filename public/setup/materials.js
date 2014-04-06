function Materials() {
}

Materials.BASIC = new THREE.MeshLambertMaterial( { shading: THREE.SmoothShading, color: 0x000000 } );
Materials.ENEMY = new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0xFFFFFF } );
Materials.DEAD = new THREE.MeshBasicMaterial( { shading: THREE.SmoothShading, color: 0x000000 } );
Materials.SKY = new THREE.MeshBasicMaterial( {color: 'black', side: THREE.BackSide} );
Materials.GROUND = new THREE.MeshBasicMaterial( {shading: THREE.SmoothShading, color: 0x009933 });
Materials.BULLET = new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0xFFFFFF } );
