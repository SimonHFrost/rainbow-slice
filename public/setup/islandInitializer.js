function IslandInitializer() {
}

IslandInitializer.prototype.makeIsland = function(floor, islandFloor) {
    var geom = new THREE.Geometry();

    geom.vertices = this.createVectors(floor, islandFloor);
    geom.faces = this.createFaces(geom.vertices);
    this.setUv(geom);

    var island = new THREE.Mesh(geom, Materials.GRASS);
    // var island = new THREE.Mesh(geom, this.createWireframe());

    island.receiveShadow = true;
    scene.add(island);

    this.createSea(islandFloor);
};

IslandInitializer.prototype.createVectors = function(floor, islandFloor) {
  var islandVectors = [
    new THREE.Vector3(-8000,floor,500),
    new THREE.Vector3(-7000,floor,-3000),
    new THREE.Vector3(-1500,floor,-5000),
    new THREE.Vector3(-1000,floor,-8000),
    new THREE.Vector3(1000,floor,-7000),
    new THREE.Vector3(6000,floor,-1500),
    new THREE.Vector3(5000,floor,3500),
    new THREE.Vector3(-1000,floor,7000)
  ];

  IslandInitializer.islandVectors = islandVectors;

  IslandInitializer.boundaries = [
    new THREE.Line3(islandVectors[0], islandVectors[1]),
    new THREE.Line3(islandVectors[1], islandVectors[2]),
    new THREE.Line3(islandVectors[2], islandVectors[3]),
    new THREE.Line3(islandVectors[3], islandVectors[4]),
    new THREE.Line3(islandVectors[4], islandVectors[5]),
    new THREE.Line3(islandVectors[5], islandVectors[6]),
    new THREE.Line3(islandVectors[6], islandVectors[7]),
    new THREE.Line3(islandVectors[7], islandVectors[0]),
  ];

  var bottomVectors = [
    new THREE.Vector3(-8000,islandFloor,500),
    new THREE.Vector3(-7000,islandFloor,-3000),
    new THREE.Vector3(-1500,islandFloor,-5000),
    new THREE.Vector3(-1000,islandFloor,-8000),
    new THREE.Vector3(1000,islandFloor,-7000),
    new THREE.Vector3(6000,islandFloor,-1500),
    new THREE.Vector3(5000,islandFloor,3500),
    new THREE.Vector3(-1000,islandFloor,7000)
  ];

  return islandVectors.concat(bottomVectors);
};

IslandInitializer.prototype.createFaces = function(vertices) {
  var faces = [];

  faces.push(new THREE.Face3(7, 1, 0));
  faces.push(new THREE.Face3(7, 2, 1));
  faces.push(new THREE.Face3(4, 3, 2));
  faces.push(new THREE.Face3(5, 4, 2));
  faces.push(new THREE.Face3(6, 5, 2));
  faces.push(new THREE.Face3(7, 6, 2));

  var numPerLayer = vertices.length / 2;
  for(var i = 0; i < numPerLayer; i++) {
    var currentVertex = i;
    var nextVertex = currentVertex === numPerLayer - 1 ? 0 : currentVertex + 1;

    faces.push(new THREE.Face3(currentVertex, nextVertex, numPerLayer + nextVertex));
    faces.push(new THREE.Face3(numPerLayer + nextVertex, numPerLayer + currentVertex, currentVertex));
  }

  var triangles = [];
  IslandInitializer.faces = faces.forEach(function(face){
    triangles.push(new THREE.Triangle(vertices[face.a], vertices[face.b], vertices[face.c]));
  });
  IslandInitializer.triangles = triangles;

  return faces;
};

IslandInitializer.prototype.setUv = function(geom) {
  for (var i = 0; i < geom.faces.length; i++) {
    geom.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 1),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(1, 0)
    ]);
  }
};

IslandInitializer.prototype.createSea = function(islandFloor) {
    var sea = new THREE.Mesh(new THREE.PlaneGeometry(50000, 50000), Materials.SEA);
    sea.position.y = islandFloor;
    sea.rotation.x = -Math.PI / 2;
    scene.add(sea);
};

IslandInitializer.prototype.createWireframe = function() {
  /* Useful for debugging UV */
  var wireFrameMaterial =
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
      wireframeLinewidth: 3
  });

  wireFrameMaterial.doubleSided = true;
  wireFrameMaterial.overdraw = true;

  return wireFrameMaterial;
};
