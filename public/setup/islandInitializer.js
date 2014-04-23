function IslandInitializer() {
}

IslandInitializer.prototype.makeIsland = function(floor) {
    var geom = new THREE.Geometry();

    var topVectors = [
      new THREE.Vector3(-8000,floor,500),
      new THREE.Vector3(-7000,floor,-3000),
      new THREE.Vector3(-1500,floor,-5000),
      new THREE.Vector3(-1000,floor,-8000),
      new THREE.Vector3(1000,floor,-7000),
      new THREE.Vector3(6000,floor,-1500),
      new THREE.Vector3(5000,floor,3500),
      new THREE.Vector3(-2000,floor,6000),
      new THREE.Vector3(-1000,floor,7000)
    ];

    var islandBottom = floor - 1000;

    var bottomVectors = [
      new THREE.Vector3(-8000,islandBottom,500),
      new THREE.Vector3(-7000,islandBottom,-3000),
      new THREE.Vector3(-1500,islandBottom,-5000),
      new THREE.Vector3(-1000,islandBottom,-8000),
      new THREE.Vector3(1000,islandBottom,-7000),
      new THREE.Vector3(6000,islandBottom,-1500),
      new THREE.Vector3(5000,islandBottom,3500),
      new THREE.Vector3(1500,islandBottom,6000),
      new THREE.Vector3(-1000,islandBottom,7000)
    ];

    geom.vertices = geom.vertices.concat(topVectors);
    geom.vertices = geom.vertices.concat(bottomVectors);

    geom.faces.push(new THREE.Face3(8, 1, 0));
    geom.faces.push(new THREE.Face3(8, 2, 1));
    geom.faces.push(new THREE.Face3(4, 3, 2));
    geom.faces.push(new THREE.Face3(5, 4, 2));
    geom.faces.push(new THREE.Face3(6, 5, 2));
    geom.faces.push(new THREE.Face3(8, 6, 2));
    geom.faces.push(new THREE.Face3(8, 7, 6));

    var bottomOffset = topVectors.length;
    for(var i = 0; i < topVectors.length; i++) {
      var currentVertex = i;
      var nextVertex = currentVertex === topVectors.length - 1 ? 0 : currentVertex + 1;

      geom.faces.push(new THREE.Face3(currentVertex, nextVertex, bottomOffset + nextVertex));
      geom.faces.push(new THREE.Face3(bottomOffset + nextVertex, bottomOffset + currentVertex, currentVertex));
    }

    for (var i = 0; i < geom.faces.length; i++) {
      geom.faceVertexUvs[0].push([
        new THREE.UV(0, 0),
        new THREE.UV(0, 1),
        new THREE.UV(1, 1),
        new THREE.UV(1, 0)
      ]);
    }

    var island = new THREE.Mesh(geom, Materials.GRASS);
    island.receiveShadow = true;
    scene.add(island);

    this.createSea(islandBottom);
};

IslandInitializer.prototype.createSea = function(islandBottom) {
    var sea = new THREE.Mesh(new THREE.PlaneGeometry(50000, 50000), Materials.SEA);
    sea.position.y = islandBottom;
    sea.rotation.x = -Math.PI / 2;
    scene.add(sea);
};

IslandInitializer.prototype.createWireframe = function() {
  /* Will be useful for debugging UV */
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
