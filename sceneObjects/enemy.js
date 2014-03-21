function Enemy(threeObject) {
  this.threeObject = threeObject;
  sceneObjects.enemies.push(this);
  scene.add(threeObject);
}
