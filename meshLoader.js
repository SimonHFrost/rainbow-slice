var meshLoader = {
  load : function() {
    var loader = new THREE.JSONLoader();

    loader.load('./model.js', function (geometry, materials) {
        var skinnedMesh = new THREE.SkinnedMesh(geometry, new THREE.MeshBasicMaterial(materials));
        skinnedMesh.position.y = 1000;
        skinnedMesh.scale.set(1000, 1000, 1000);
        scene.add(skinnedMesh);
    });
  },

};
