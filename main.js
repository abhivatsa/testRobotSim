import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';

const container = document.createElement( 'div' );
document.body.appendChild( container );

let camera, scene, renderer, stats;

const clock = new THREE.Clock();
let mixer;

// camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 20 );
camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(-2,2,2);

scene = new THREE.Scene();
scene.background = new THREE.Color( 0xa0a0a0 );
scene.fog = new THREE.Fog( 0xa0a0a0, 2, 10 );

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 5 );
hemiLight.position.set( 0, 200, 0 );
scene.add( hemiLight );

const dirLight = new THREE.DirectionalLight( 0xffffff, 5 );
dirLight.position.set( 0, 200, 100 );
dirLight.castShadow = true;
dirLight.shadow.camera.top = 180;
dirLight.shadow.camera.bottom = - 100;
dirLight.shadow.camera.left = - 120;
dirLight.shadow.camera.right = 120;
scene.add( dirLight );

const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add( mesh );

const grid = new THREE.GridHelper( 20, 40, 0x000000, 0x000000 );
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add( grid );

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
container.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0.5, 0 );
controls.update();

window.addEventListener( 'resize', onWindowResize );

// stats = new Stats();
// container.appendChild( stats.dom );

const loader1 = new GLTFLoader();
const loader2 = new GLTFLoader();
const loader3 = new GLTFLoader();
const loader4 = new GLTFLoader();
const loader5 = new GLTFLoader();
const loader6 = new GLTFLoader();
const loader7 = new GLTFLoader();

var link0;
var link1;
var link2;
var link3;
var link4;
var link5;
var link6;


loader1.load( './robot_gltf/link0.glb', function ( gltf ) {

    link0 = gltf.scene;
	scene.add(link0);

    loader2.load( './robot_gltf/link1.glb', function ( gltf ) {

        link1 = gltf.scene;
        link0.add(link1);
        link1.position.setY(0.075);

        loader3.load( './robot_gltf/link2.glb', function ( gltf ) {

            link2 = gltf.scene;
            link1.add(link2);
            link2.position.setY(0.124);
            link2.position.setZ(0.085);

            loader4.load( './robot_gltf/link3.glb', function ( gltf ) {

                link3 = gltf.scene;
                link2.add(link3);
                link3.position.setY(0.52);
                link3.position.setZ(0.0025)

                loader5.load( './robot_gltf/link4.glb', function ( gltf ) {

                    link4 = gltf.scene;
                    link3.add(link4);
                    link4.position.setY(0.118);
                    link4.position.setZ(-0.085);
                    // link4.rotation.y = -Math.PI/2;

                    loader6.load( './robot_gltf/link5.glb', function ( gltf ) {

                        link5 = gltf.scene;
                        link4.add(link5);
                        link5.position.setY(0.362);
                        link5.position.setZ(0.075);

                        loader7.load( './robot_gltf/link6.glb', function ( gltf ) {

                            link6 = gltf.scene;
                            link5.add(link6);
                            link6.position.setY(0.115);
                            link6.position.setZ(-0.072);
                        });
                    
                    });
                
                });
            
            });
        
        });
    
    });

});


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}



var y_val = 0;
function animate() {

    

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if ( mixer ) mixer.update( delta );

    renderer.render( scene, camera );
    
    // link4.rotation.y = -1.5708;
    // link5.rotation.y = -1.5708;
    // link6.rotation.y = -1.5708;

    // link0.position.setX(0);
    // link0.position.setY(0);
    // link0.position.setZ(0.2);

    link1.rotation.y = y_val;
    link2.rotation.z = -y_val;
    link3.rotation.z = -y_val;
    link4.rotation.y = y_val;
    link5.rotation.z = -y_val;
    link6.rotation.y = y_val;
    
// 
    y_val = y_val + 0.01;

    stats.update();

}

animate();