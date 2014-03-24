var meshLoader = {
  FLOOR : 0,

  load : function() {
    var me = this;
    var loader = new THREE.JSONLoader();

    loader.load('./setup/parrot.js', function (geometry) {
        me.morphColorsToFaceColors(geometry);

        var playerMaterial = new THREE.MeshLambertMaterial( { color: 0xffaa55, morphTargets: true, vertexColors: THREE.FaceColors } );
        var playerModel = new THREE.SkinnedMesh(geometry, playerMaterial, false);

        playerModel.rotation.y = Math.PI;
        playerModel.scale.set(10, 10, 10);
        playerModel.castShadow = true;

        // using player as a hitbox
        sceneObjects.player.visible = false;
        sceneObjects.player.add(playerModel);
        sceneObjects.playerModel = playerModel;
    });

    loader.load('./setup/horse.js', function (geometry) {
      me.morphColorsToFaceColors(geometry);
      var enemyMaterial = new THREE.MeshLambertMaterial( { color: 0xffaa55, morphTargets: true, vertexColors: THREE.FaceColors } );
      var enemyModel = new THREE.SkinnedMesh(geometry, enemyMaterial, false);
      enemyModel.castShadow = true;
      enemyModel.scale.set(2, 2, 2);
      enemyModel.position.y = -100;

      for(var i = 0; i < sceneObjects.enemies.length; i++) {
        var enemy = sceneObjects.enemies[i];

        enemy.threeObject.visible = false;
        enemy.threeObject.add(enemyModel.clone());
      }
    });
  },

  morphColorsToFaceColors : function(geometry) {
			if (geometry.morphColors && geometry.morphColors.length) {
				var colorMap = geometry.morphColors[0];
				for (var i = 0; i < colorMap.colors.length; i ++) {
					geometry.faces[i].color = colorMap.colors[i];
				}
			}
    }
};
