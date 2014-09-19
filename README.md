Rainbow_Slice
=============

Prototype WebGL game that is deployed [here](http://www.rainbowslice.com).

[![Code Climate](https://codeclimate.com/github/SimonHFrost/Rainbow_Slice.png)](https://codeclimate.com/github/SimonHFrost/Rainbow_Slice)

![Image of RainbowSlice](rainbowslice.png)

Testing
=============

Testing framework requires npm installation of mocha, chai, should, and the mocha-phantomjs runner

Open TestRunner.html to see test execution

TODO:
-----

* change bullet.used and enemy.isDead hacks
* shouldn't have to pass sceneObjects into any classes instantiated in sceneObjects
* reduce constructor params enemy.js
* reduce constructor params enemySpawner.js
* reduce class sizes
* reduce method sizes
* all scene additions in sceneObjects apart from enemySpawner
* stop main.js using properties of sceneObjects
	* maybe add scene objects
	* add updatable objects
	* have methods that expose camera/updatable objects/morphs
* move remove enemy and toggle falling from sceneObjects
* improve code climate score
* make it so multiple sounds can play at once
* standardize a way the parent object from a threejs is found
* use enemy width and player width from the threeObjects themselves and not from a const
* tidy app.js