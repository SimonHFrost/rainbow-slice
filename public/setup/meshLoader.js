window.MeshLoader = (function() {
  "use strict";

  function MeshLoader(sceneObjects, player, morphs) {
    this.FLOOR = 0;
    this.DEBUG_HITBOX = false;

    this.sceneObjects = sceneObjects;
    this.player = player;
    this.morphs = morphs;
    this.enemyTemplate = '';

    this.load();
  }

  MeshLoader.prototype.load = function() {
    var me = this;
    var loader = new THREE.JSONLoader();

    loader.load('./resources/models/horse.js', function(geometry) {
      me.morphColorsToFaceColors(geometry);
      me.addMorph(geometry, 550, 1000);

      // using player as a hitbox
      if (!me.DEBUG_HITBOX) {
        me.player.visible = false;
      }
    });

    loader.load('./resources/models/parrot.js', function(geometry) {
      me.morphColorsToFaceColors(geometry);
      var enemyMaterial = new THREE.MeshLambertMaterial({
        color: 0xffaa55,
        morphTargets: true,
        vertexColors: THREE.FaceColors
      });
      var enemyModel = new THREE.SkinnedMesh(geometry, enemyMaterial, false);
      enemyModel.castShadow = true;
      enemyModel.scale.set(8, 8, 8);
      me.enemyTemplate = enemyModel;
    });
  };

  MeshLoader.prototype.setEnemyModel = function(enemy) {
    if (!this.DEBUG_HITBOX) {
      enemy.threeObject.visible = false;
    }
    enemy.threeObject.add(this.enemyTemplate.clone());
  };

  MeshLoader.prototype.morphColorsToFaceColors = function(geometry) {
    if (geometry.morphColors && geometry.morphColors.length) {
      var colorMap = geometry.morphColors[0];
      for (var i = 0; i < colorMap.colors.length; i++) {
        geometry.faces[i].color = colorMap.colors[i];
      }
    }
  };

  MeshLoader.prototype.addMorph = function(geometry, speed, duration) {
    var material = new THREE.MeshLambertMaterial({
      color: 0xffaa55,
      morphTargets: true,
      vertexColors: THREE.FaceColors
    });
    var meshAnim = new THREE.MorphAnimMesh(geometry, material);

    meshAnim.speed = speed;
    meshAnim.duration = duration;
    meshAnim.time = 600 * Math.random();

    meshAnim.position.y = -100;
    meshAnim.rotation.y = Math.PI;

    meshAnim.castShadow = true;
    meshAnim.scale.set(3, 3, 3);

    this.sceneObjects.playerModel = meshAnim;
    this.player.add(meshAnim);
    this.morphs.push(meshAnim);
  };

  return MeshLoader;
})();