import './style.css'
import * as THREE from 'three';
import { Color, Path, TextureLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { randFloatSpread } from 'three/src/math/MathUtils';
import { arraySlice } from 'three/src/animation/AnimationUtils';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);



const geometry = new THREE.TorusGeometry(10,3,16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.DirectionalLight(0xffffff);
pointLight.position.set(10, 10 ,10);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
    const star = new THREE.Mesh (geometry, material);

    const [x, y, z]= Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z)
    scene.add(star)
}
Array(200).fill().forEach(addStar)
/*https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg*/
//https://raw.githubusercontent.com/fireship-io/threejs-scroll-animation-demo/main/space.jpg

const loader = new THREE.TextureLoader
const spaceTexture = loader.load('./assets/images/space.jpg');
scene.background=spaceTexture

const picardTexture = loader.load('./assets/images/picardabsoluteballer.PNG')
const picard = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial ( {map:picardTexture})
);
scene.add(picard)
//moon
//'https://raw.githubusercontent.com/fireship-io/threejs-scroll-animation-demo/main/moon.jpg'
//
const moonTexture = loader.load('./assets/images/moon.jpg')
const normalTexture = loader.load('./assets/images/normal.jpg')
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({map: moonTexture , normalMap: normalTexture})
);
scene.add(moon);

function animate() {
    requestAnimationFrame( animate  );
    torus.rotation.x +=.01
    torus.rotation.y += .005
    torus.rotation.z += .01
    controls.update();
    renderer.render (scene, camera);
}

animate();