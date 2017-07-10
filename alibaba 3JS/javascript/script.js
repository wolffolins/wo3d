window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
    function(callback, element){
        window.setTimeout(callback, 1000 / 60);
    };
})();

var scene, camera, renderer, controls;
var sphere;

//------------------------------------------------------------

window.onload = init;

function init() {
    
    // Setup ________________________________________________
    window.addEventListener('resize', onWindowResize, false);
    scene = new THREE.Scene();

    var manager = new THREE.LoadingManager();
                manager.onProgress = function ( item, loaded, total ) {

                    console.log( item, loaded, total );

                };

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.x = 30;
    camera.position.y = 15;
    camera.position.z = 450;
    camera.lookAt(new THREE.Vector3(0,0,0));

        

    renderer = new THREE.WebGLRenderer();  
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xf6f6f6, 1);
    renderer.shadowMapEnabled = true;
    document.body.appendChild( renderer.domElement );
    /*$("#WebGLOutput").append(renderer.domElement);*/

    controls = new THREE.OrbitControls( camera, renderer.domElement );







// load a resource

/*var loader = new THREE.ObjectLoader();
loader.load("../models/untitled-scene.json",function ( obj ) {
     scene.add( obj );
});*/


    // model1 ________________________________________________
/*    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader();
    loader.load( '../images/material12.jpg', function ( image ) {
        texture.image = image;
        texture.needsUpdate = true;
    } );

    // model
    var loader = new THREE.OBJLoader();
    loader.load( '../models/object4.3.2.obj', function ( object ) {
        object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            child.material.map = texture;
        }});
        scene.add( object );
    });*/




    // model2 ________________________________________________
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader();
    loader.load( '../models/02.1Surface_Color.jpg', function ( image ) {
        texture.image = image;
        texture.needsUpdate = true;
    } );

    // model
    var loader = new THREE.OBJLoader();
    loader.load( '../models/00_body_BAKED 2.obj', function ( object ) {
        object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            child.material.map = texture;
        }});
        scene.add( object );
    });













    // Lights ________________________________________________
   var light = new THREE.PointLight(0xffffff);
    light.position.set(0,100,200);
    scene.add(light);




    render();
}

//------------------------------------------------------------

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//------------------------------------------------------------

function render() {


    requestAnimationFrame(render); 
    renderer.render(scene, camera);
    controls.update();
}


















