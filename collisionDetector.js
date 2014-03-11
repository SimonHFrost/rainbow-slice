function detectCollisions() {
  var originPoint = mainCube.position.clone();

  /*
  this.horizontalVertices = [
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(1, 0, 1),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(1, 0, -1),
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(-1, 0, -1),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(-1, 0, 1)
  ];
  */

  for (var vertexIndex = 0; vertexIndex < mainCube.geometry.vertices.length; vertexIndex++)
  {
    var localVertex = mainCube.geometry.vertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4( mainCube.matrix );
    var directionVector = globalVertex.sub( mainCube.position );
    var normalized = directionVector.clone().normalize();

    var ray = new THREE.Raycaster( originPoint, normalized );
    var collisionResults = ray.intersectObjects( enemyMeshList );
    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
      var enemy = collisionResults[0].object;
      enemy.material = new THREE.MeshBasicMaterial( {color: 0xCC0000} );

      if (normalized.x > 0) {
        enemy.position.x += 20;
      }

      if (normalized.x < 0) {
        enemy.position.x -= 20;
      }

      if (normalized.z > 0) {
        enemy.position.z += 20;
      }

      if (normalized.z < 0) {
        enemy.position.z -= 20;
      }
    }
  }
}
