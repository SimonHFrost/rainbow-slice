var meshLoader = {
  FLOOR : 0,
  enemyTemplate : '',

  load : function() {
    var me = this;
    var loader = new THREE.JSONLoader();

    loader.load('./models/horse.js', function (geometry) {
        me.morphColorsToFaceColors(geometry);
        me.addMorph(geometry, 550, 1000);

        // using player as a hitbox
        sceneObjects.player.visible = false;
    });

    loader.load('./models/parrot.js', function (geometry) {
      me.morphColorsToFaceColors(geometry);
      var enemyMaterial = new THREE.MeshLambertMaterial( { color: 0xffaa55, morphTargets: true, vertexColors: THREE.FaceColors } );
      var enemyModel = new THREE.SkinnedMesh(geometry, enemyMaterial, false);
      enemyModel.castShadow = true;
      enemyModel.scale.set(8, 8, 8);
      me.enemyTemplate = enemyModel;
    });
  },

  setEnemyModel : function(enemy) {
    enemy.threeObject.visible = false;
    enemy.threeObject.add(this.enemyTemplate.clone());
  },

  morphColorsToFaceColors : function(geometry) {
		if (geometry.morphColors && geometry.morphColors.length) {
			var colorMap = geometry.morphColors[0];
			for (var i = 0; i < colorMap.colors.length; i ++) {
				geometry.faces[i].color = colorMap.colors[i];
			}
		}
  },

  addMorph : function( geometry, speed, duration) {
    var material = new THREE.MeshLambertMaterial( { color: 0xffaa55, morphTargets: true, vertexColors: THREE.FaceColors } );
    var meshAnim = new THREE.MorphAnimMesh( geometry, material );

    meshAnim.speed = speed;
    meshAnim.duration = duration;
    meshAnim.time = 600 * Math.random();

    meshAnim.position.y = -100;
    meshAnim.rotation.y = Math.PI;

    meshAnim.castShadow = true;
    meshAnim.scale.set(3, 3, 3);

    sceneObjects.playerModel = meshAnim;
    sceneObjects.player.add(meshAnim);
    sceneObjects.morphs.push(meshAnim);
  }
};
