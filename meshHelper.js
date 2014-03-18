var container, stats;
var camera, scene, renderer;
var mesh;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var lightMesh;

var directionalLight, pointLight;

init();
animate();

function init() {
    container = document.getElementById('container');

    //Camera setup
    camera = new THREE.Camera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    //Scene
    scene = new THREE.Scene();

    //Lights
    //setupLights();
    var ambient = new THREE.AmbientLight(0x555555);
    scene.addLight(ambient);

    directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.x = 1;
    directionalLight.position.y = 1;
    directionalLight.position.z = 0.5;
    directionalLight.position.normalize();
    scene.addLight(directionalLight);

    pointLight = new THREE.PointLight(0xffaa00);
    pointLight.position.x = 0;
    pointLight.position.y = 0;
    pointLight.position.z = 0;
    scene.addLight(pointLight);

    //WebGL renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setFaceCulling(0);
    container.appendChild(renderer.domElement);

    //Stats
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    // Cubic Texture
    //var r = "textures/cube/SwedishRoyalCastle/";
    var r = "three.js/textures/cube/Bridge2/";
    //var r = "../three.js/examples/textures/cube/SwedishRoyalCastle/";
    var urls = [r + "posx.jpg", r + "negx.jpg",
       r + "posy.jpg", r + "negy.jpg",
       r + "posz.jpg", r + "negz.jpg"];

    /*var urls = [r + "px.jpg", r + "nx.jpg",
       r + "py.jpg", r + "ny.jpg",
       r + "pz.jpg", r + "nz.jpg"];*/

    var textureCube = THREE.ImageUtils.loadTextureCube(urls);

    //Car Camaro materials
    var carCamaroMaterials = {
        body: new THREE.MeshLambertMaterial({ color: 0x620050, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.3 }),
        chrome: new THREE.MeshLambertMaterial({ color: 0xffffff, envMap: textureCube }),
        darkchrome: new THREE.MeshLambertMaterial({ color: 0x444444, envMap: textureCube }),
        glass: new THREE.MeshBasicMaterial({ color: 0x223344, envMap: textureCube, opacity: 0.25, combine: THREE.MixOperation, reflectivity: 0.25, transparent: true }),
        tire: new THREE.MeshLambertMaterial({ color: 0x050505 }),
        interior: new THREE.MeshPhongMaterial({ color: 0x050505, shininess: 20 }),
        black: new THREE.MeshLambertMaterial({ color: 0x000000 })

    };

    //Load Camaro Model
    var loader = new THREE.BinaryLoader();
    loader.load({
        model: "three.js/examples/obj/camaro/CamaroNoUv_bin.js",
        callback: function (geometry) {
            createCamaroScene(geometry, carCamaroMaterials);
        }
    });

    document.addEventListener('mousemove', onDocumentMouseMove, false);
}

function setupLights() {
    var ambient = new THREE.AmbientLight(0x555555);
    scene.addLight(ambient);

    directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.x = 1;
    directionalLight.position.y = 1;
    directionalLight.position.z = 0.5;
    directionalLight.position.normalize();
    scene.addLight(directionalLight);

    pointLight = new THREE.PointLight(0xffaa00);
    pointLight.position.x = 0;
    pointLight.position.y = 0;
    pointLight.position.z = 0;
    scene.addLight(pointLight);
}

function createCamaroScene(geometry, materials) {
    var scale = 40,
    m = new THREE.MeshFaceMaterial();

    geometry.materials[0][0] = materials.body; // car body
    geometry.materials[1][0] = materials.chrome; // wheels chrome
    geometry.materials[2][0] = materials.chrome; // grille chrome
    geometry.materials[3][0] = materials.darkchrome; // door lines
    geometry.materials[4][0] = materials.glass; // windshield
    geometry.materials[5][0] = materials.interior; // interior
    geometry.materials[6][0] = materials.tire; // tire
    geometry.materials[7][0] = materials.black; // tireling
    geometry.materials[8][0] = materials.black; // behind grille

    var mesh = new THREE.Mesh(geometry, m);
    mesh.rotation.y = 1;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
    mesh.position.x = 300;
    scene.addObject(mesh);
}


function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
}

function render() {
    var timer = -new Date().getTime() * 0.0002;

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;

    //lightMesh.position.x = 1500 * Math.cos(timer);
    //lightMesh.position.z = 1500 * Math.sin(timer);

    renderer.render(scene, camera);
}
