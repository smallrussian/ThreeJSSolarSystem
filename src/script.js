import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(-90, 140, 140);

const loader = new THREE.TextureLoader
const suntexture=loader.load('./assets/images/sun.jpg')
const mercuryTexture = loader.load('./assets/images/mercury.jpg')
const venusTexture = loader.load('./assets/images/venus.jpg')
const earthTexture = loader.load('./assets/images/earth.jpg')
const marsTexture = loader.load('./assets/images/mars.jpg')
const jupiterTexture = loader.load('./assets/images/jupiter.jpg')
const saturnTexture = loader.load('./assets/images/saturn.jpg')
const saturnRingTexture = loader.load('./assets/images/saturnring.png')
const uranusTexture = loader.load('./assets/images/uranus.jpg')
const uranusRingTexture =loader.load('./assets/images/uranusring.png')
const neptuneTexture = loader.load('./assets/images/neptune.jpg')

const sunGeo = new THREE.SphereGeometry(16,30, 30);
const sunMat = new THREE.MeshBasicMaterial({map: suntexture});
const sun = new THREE.Mesh(sunGeo, sunMat);

scene.add(sun);

function createPlanet(size, texture, position, ring, horizontal){
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({map: texture});
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius, 
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: ring.texture,
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat)
        obj.add(ringMesh);
        ringMesh.position.x = position;
        if(horizontal==true) 
            {ringMesh.rotation.x = -.5 * Math.PI;}
        
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh: mesh, obj: obj}
}



const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.8, venusTexture, 44);
const earth = createPlanet(6, earthTexture, 62);
const mars = createPlanet(4, marsTexture, 78);
const jupiter = createPlanet(12, jupiterTexture, 100);
const saturn = createPlanet(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
}, true);
const uranus = createPlanet(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
}, false)
const neptune = createPlanet(7, neptuneTexture, 200)


/*const saturnRingTexture = loader.load('https://raw.githubusercontent.com/WaelYasmina/solarsystem/main/src/img/saturn%20ring.png')
const saturnRingGeo = new THREE.RingGeometry(10, 20, 30)
const saturnRingMat = new THREE.MeshBasicMaterial({map: saturnRingTexture, side: THREE.DoubleSide})
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
saturnObj.add(saturnRing);
saturnRing.position.x=138;
saturnRing.rotation.x= -0.5 * Math.PI;*/

const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight)


const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50)
//scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);


/*https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg*/
//https://raw.githubusercontent.com/fireship-io/threejs-scroll-animation-demo/main/space.jpg


const spaceTexture = loader.load('./assets/images/space.jpg');

const cubeTextureLoader = new THREE.CubeTextureLoader
scene.background = new THREE.CubeTextureLoader()
    .load([
        './assets/images/stars.jpg',
        './assets/images/stars.jpg',
        './assets/images/stars.jpg',
        './assets/images/stars.jpg',
        './assets/images/stars.jpg',
        './assets/images/stars.jpg'
    ]);


const picardTexture = loader.load('./assets/images/picardabsoluteballer.PNG')
const picard = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial ( {map:picardTexture})
);
scene.add(picard)
//moon
//'https://raw.githubusercontent.com/fireship-io/threejs-scroll-animation-demo/main/moon.jpg'
//


function animate() {
    sun.rotateY(.004)
    //self rotation
    
    mercury.mesh.rotateY(.004)
    venus.mesh.rotateY(.002)
    earth.mesh.rotateY(.02)
    mars.mesh.rotateY(.018)
    jupiter.mesh.rotateY(.04)
    saturn.mesh.rotateY(.038)
    uranus.mesh.rotateY(.03)
    neptune.mesh.rotateY(.032)
    //orbital rotation
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);

    requestAnimationFrame( animate  );

    controls.update();
    renderer.render (scene, camera);
}

animate()