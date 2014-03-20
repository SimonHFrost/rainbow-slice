var meshLoader = {
  FLOOR : 0,

  load : function() {
    var me = this;
    var loader = new THREE.JSONLoader();

    loader.load('./setup/parrot.js', function (geometry, importedMaterials) {
        //var playerModel = new THREE.SkinnedMesh(geometry, new THREE.MeshLambertMaterial(importedMaterials), false);
        var playerModel = new THREE.SkinnedMesh(geometry, materials.BASIC, false);

        playerModel.rotation.y = Math.PI;
        playerModel.scale.set(10, 10, 10);
        playerModel.castShadow = true;

        // using player as a hitbox
        sceneObjects.player.visible = false;
        // sceneObjects.player.add(playerModel);
        sceneObjects.playerModel = playerModel;
        // scene.add(playerModel);
    });
  },

};
