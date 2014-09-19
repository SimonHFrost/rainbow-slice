describe("Basic Tests", function () {
    it("SceneObjects class exists", function () {
        (SceneObjects.prototype).should.not.equal(null);
    });

    it("IslandInitializer is initialized", function () {
        var materials = {grass: ''};
        (new IslandInitializer(materials).makeIsland(0, -1000)).should.not.equal(null);
    });
});