var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(0, 0, 4);
var loader = new THREE.ColladaLoader();
loader.load("ET2.dae", function (result) {
    scene.add(result.scene);
});

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
