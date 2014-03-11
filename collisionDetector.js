function detectCollisions() {
  var originPoint = sphere.position.clone();
  for (var vertexIndex = 0; vertexIndex < sphere.geometry.vertices.length; vertexIndex++)
  {
    var localVertex = sphere.geometry.vertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4( sphere.matrix );
    var directionVector = globalVertex.sub( sphere.position );

    var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
    var collisionResults = ray.intersectObjects( collidableMeshList );
    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
      collisionResults[0].object.material = new THREE.MeshBasicMaterial( {color: 0xCC0000} );
    }
  }
}
