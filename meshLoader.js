var meshLoader = {
  FLOOR : 0,

  load : function() {
    var me = this;
    var loader = new THREE.JSONLoader();

    loader.load('./parrot.js', function (geometry, importedMaterials) {
        //var skinnedMesh = new THREE.SkinnedMesh(geometry, new THREE.MeshLambertMaterial(importedMaterials), false);
        var skinnedMesh = new THREE.SkinnedMesh(geometry, materials.BASIC, false);

        skinnedMesh.rotation.y = Math.PI;
        skinnedMesh.scale.set(10, 10, 10);

				me.morphColorsToFaceColors( geometry );
				me.addMorph( geometry, 500, 1000, 500 - Math.random() * 500, this.FLOOR + 350, 40 );

        // using player as a hitbox
        sceneObjects.player.visible = false;
        sceneObjects.player.add(skinnedMesh);
        // scene.add(skinnedMesh);
    });
  },

};
