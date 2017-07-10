

		if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

		var container;

		var camera, scene, renderer, effect, light;
		var group;
    var video;
		var objScale = 0.01;
		init();
		animate();

		function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );

				scene = new THREE.Scene();

				group = new THREE.Group();
				scene.add( group );
        //group.rotation.y=90;
        //group.position.x = 0.9;

				var amb = new THREE.AmbientLight(0xffffff);
				//scene.add(amb);

        var light = new THREE.PointLight( 0xffffff, 2, 0 );
        light.position.set( -50, 20, -50 );
        scene.add( light );

				var light2 = new THREE.PointLight( 0xffffff, 1, 0 );
        light2.position.set( 0, 20, 50 );
        scene.add( light2 );
				// Cube


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
						//object.position.set(0,0,0);
						object.scale.set(objScale,objScale,objScale);
						group.add( object );
						console.log(object);

				});


				// create the stars
				var pMaterial = new THREE.ParticleBasicMaterial({
				  color: 0xffffff,
				  size: 20,
				  map: THREE.ImageUtils.loadTexture(
				    "/media/particle.png"
				  ),
				  transparent: true,
				  blending: THREE.CustomBlending,
				  blendSrc: THREE.SrcAlphaFactor,
				  blendDst: THREE.OneMinusSrcColorFactor,
				  blendEquation: THREE.AddEquation
				});

				var particleCount = 1800;
				var particles = new THREE.Geometry(), pMaterial

				for(var p = 0; p < particleCount; p++) {
				var pX = Math.random() * 1000 - 500,
				    pY = Math.random() * 1000 - 500,
				    pZ = Math.random() * 1000 - 500,
				    particle = new THREE.Vector3(pX, pY, pZ)
				particles.vertices.push(particle);
				}
				scene.add(particles)
				window.particleSystem = new THREE.ParticleSystem(particles, pMaterial);
				particleSystem.sortParticles = true;
				scene.add(particleSystem);

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				container.appendChild( renderer.domElement );

				effect = new THREE.PeppersGhostEffect( renderer );
				effect.setSize( window.innerWidth, window.innerHeight );
				effect.cameraDistance = 5;

				window.addEventListener( 'resize', onWindowResize, false );

		}

		function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				effect.setSize( window.innerWidth, window.innerHeight );

		}

		function animate() {

				requestAnimationFrame( animate );

				render();

		}

		function render() {

			//group.rotation.y += 0.01;
			particleSystem.rotation.y+=.001;
      //  aniseq();
				effect.render( scene, camera );

		}

  //  console.log(group.position.y);
    var isUp=true;

    function aniseq() {
      if (group.position.y<=0)
      {
        isUp = true;
      } else if (group.position.y>=0.1)
      {
        isUp=false;
      }

      if(isUp)
      {
        group.position.y+=0.01;
      } else {
        group.position.y-=0.01;
      }

    }

    function videoscreen(){
      // create the video element
    	video = document.createElement( 'video' );
    	// video.id = 'video';
    	// video.type = ' video/ogg; codecs="theora, vorbis" ';
    	video.src = "videos/sintel.ogv";
    	video.load(); // must call after setting/changing source
    	video.play();

    	// alternative method --
    	// create DIV in HTML:
    	// <video id="myVideo" autoplay style="display:none">
    	//		<source src="videos/sintel.ogv" type='video/ogg; codecs="theora, vorbis"'>
    	// </video>
    	// and set JS variable:
    	// video = document.getElementById( 'myVideo' );

    	videoImage = document.createElement( 'canvas' );
    	videoImage.width = 480;
    	videoImage.height = 204;

    	videoImageContext = videoImage.getContext( '2d' );
    	// background color if no video present
    	videoImageContext.fillStyle = '#000000';
    	videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

    	videoTexture = new THREE.Texture( videoImage );
    	videoTexture.minFilter = THREE.LinearFilter;
    	videoTexture.magFilter = THREE.LinearFilter;

    	var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.DoubleSide } );
    	// the geometry on which the movie will be displayed;
    	// 		movie image will be scaled to fit these dimensions.
    	var movieGeometry = new THREE.PlaneGeometry( 240, 100, 4, 4 );
    	var movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
    	movieScreen.position.set(0,50,0);
    	scene.add(movieScreen);
    }
