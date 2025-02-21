import * as THREE from 'three';
import { GLTFLoader } from "../three/GLTFLoader.js";
import { OrbitControls } from '../three/OrbitControls.js';
import { RGBELoader } from '../three/RGBELoader.js';


let logoScene, logo;


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const container = document.getElementById("threejscanvas")



const renderer = new THREE.WebGLRenderer({canvas: container, antialias: true,alpha:true});
renderer.setSize( container.clientWidth, container.clientHeight );

const controls = new OrbitControls( camera, renderer.domElement );

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1;



//controls.enableZoom = false;
controls.enableDamping = true;
controls.dampingFactor = 0.02;
controls.rotateSpeed = 0.5





// ---------------------------------------------------------------------
// HDRI - IMAGE BASED LIGHTING
// ---------------------------------------------------------------------
new RGBELoader()
.setPath('./assets/')
.load('photo_studio_02_2k.hdr', function (texture) {
;
    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.environment = texture;

 

});


var loadingManager = new THREE.LoadingManager();

loadingManager.onLoad = function(){

  //loadingDiv.style.display = "none";



}


const loader = new GLTFLoader(loadingManager);
loader.load(
// resource URL
'./assets/k_logo.gltf',
//'https://storage.googleapis.com/dheerajv-bucket/images/aorta.glb',
// called when the resource is loaded
function ( gltf ) {


    logoScene = gltf.scene;
    scene.add( logoScene);
    logo = logoScene.getObjectByName('k_logo');




});





//////
window.addEventListener('resize', function()

{
var width = window.innerWidth;
var height = window.innerHeight;
renderer.setSize( width, height );
camera.aspect = width / height;
camera.updateProjectionMatrix();
} );





function animate(time) {
    requestAnimationFrame( animate );
    controls.update();

    if(logo){
        logo.rotation.y += 0.005;
    }

    renderer.render( scene, camera );
    

}
animate();

