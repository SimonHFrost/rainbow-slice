var assert = require("assert");
require("../public/setup/islandInitializer.js");
require("../public/resources/lib/three.js");

describe('island initializer', function(){
  describe('floor and island get initalized', function(){
    it('making an island should return something', function(){
      assert.notEqual(null, new IslandInitializer().makeIsland(0, 0));
      assert.notEqual(null, new IslandInitializer().makeSea(0));
    });
  });
});