import * as THREE from 'three';
import { OrbitControls } from 'three/examples/js/controls/OrbitControls';

// Create the scene
const scene = new THREE.Scene();

// Set up the camera with a perspective projection
const camera = new THREE.PerspectiveCamera(
  75,                  // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1,                 // Near clipping plane
  1000                 // Far clipping plane
);
camera.position.set(0, 2, 5); // Position the camera

// Set up the WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Add Orbit Controls for camera navigation
const controls = new OrbitControls(camera, renderer.domElement);

g_lighting = "overhead";
g_lampLoc = [] // corrdinates for lamp 

g_poster1 = False;
g_poster2 = False;
g_poster3 = False;
g_poster4 = False;
g_poster5 = False;

g_books = False;
g_candle = False;
g_clock = False;
g_doll = False;
g_calender = False;

g_mirror = False;
g_doWork = False;




document.getElementById("overhead").addEventListener('click', function() { 
    g_lighting = "overhead";
});
document.getElementById("lamp1").addEventListener('click', function() { 
    g_lighting = "lamp1";
});
document.getElementById("lamp2").addEventListener('click', function() { 
    g_lighting = "lamp2";
});

document.getElementById("circle1").addEventListener('click', function() { 
    g_poster5 = !g_poster5;
});
document.getElementById("circle2").addEventListener('click', function() { 
    g_poster4 = !g_poster4;
});
document.getElementById("rect1").addEventListener('click', function() { 
    g_poster3 = !g_poster3;
});
document.getElementById("rect2").addEventListener('click', function() { 
    g_poster2 = !g_poster2;
});
document.getElementById("rect3").addEventListener('click', function() { 
    g_poster1 = !g_poster1;

});

document.getElementById("books").addEventListener('click', function() { 
    g_books = !g_books;

});
document.getElementById("candle").addEventListener('click', function() { 
    g_candle = !g_candle;

});
document.getElementById("clock").addEventListener('click', function() { 
    g_clock = !g_clock;
});
document.getElementById("doll").addEventListener('click', function() { 
    g_doll = !g_doll;
});
document.getElementById("calender").addEventListener('click', function() { 
    g_calendar = !g_calendar;
});


document.getElementById("doWork").addEventListener('click', function() { 
    g_doWork = !g_doWork;
});


document.getElementById("mirror").addEventListener('click', function() { 
    g_mirror = !g_mirror;
});

// Set up a skybox (add images to the array of textures for the sides of the skybox)
const loader = new THREE.CubeTextureLoader();
// blank 
scene.background = loader.load([
  './src/walls/wall.jpg', './src/walls/wall.jpg', // Positive X and Negative X faces
  './src/walls/wall.jpg', './src/walls/wall.jpg', // Positive Y and Negative Y faces
  './src/walls/ceiling.jpg', './src/walls/floor.jpg'  // Positive Z and Negative Z faces
]);


const mtlLoader = new MTLLoader();
const objLoader = new OBJLoader();
mtlLoader.load('./src/importedObj/desk/desk.mtl', (materials) => {
  materials.preload();
  objLoader.setMaterials(materials);
  objLoader.load('./src/importedObj/desk/desk.obj', (table) => {
      scene.add(table);
      table.scale.set(1, 1, 1);
  });
});


const mtlLoaderShelf = new MTLLoader();
const objLoaderShelf = new OBJLoader();
mtlLoaderShelf.load('./src/importedObj/Shelf/109.mtl', (materials) => {
  materials.preload();
  objLoaderShelf.setMaterials(materials);
  objLoaderShelf.load('./src/importedObj/Shelf/109.obj', (shelf) => {
      scene.add(shelf);
      shelf.rotation.y = - Math.PI/ 2;
      shelf.scale.set(0.1, 0.1, 0.1);
      shelf.position.set(-17,-1.5,-31);
  });
});




const notebookGroup = new THREE.Group();

const pageWidth = 4;   // width of one page
const pageHeight = 6;  // height of one page

const leftPageGeometry = new THREE.PlaneGeometry(pageWidth, pageHeight);
leftPageGeometry.translate(-pageWidth / 2, 0, 0);
const leftPageMaterial = new THREE.MeshStandardMaterial({
  color: 0xfefbd8, // paper-like color
  side: THREE.DoubleSide
});
const leftPage = new THREE.Mesh(leftPageGeometry, leftPageMaterial);
leftPage.rotation.x = -Math.PI / 2;
leftPage.position.set(0, 0.001, 0);
notebookGroup.add(leftPage);

const rightPageGeometry = new THREE.PlaneGeometry(pageWidth, pageHeight);
rightPageGeometry.translate(pageWidth / 2, 0, 0);
const rightPageMaterial = new THREE.MeshStandardMaterial({
  color: 0xfefbd8,
  side: THREE.DoubleSide
});
const rightPage = new THREE.Mesh(rightPageGeometry, rightPageMaterial);
rightPage.rotation.x = -Math.PI / 2;
rightPage.position.set(0, -0.001, 0);
notebookGroup.add(rightPage);

const ringCount = 10;
for (let i = 0; i < ringCount; i++) {
  const ringGeometry = new THREE.RingGeometry(0.15, 0.25, 32);
  const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    side: THREE.DoubleSide
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.z = Math.PI / 2;
  const ringZ = THREE.MathUtils.lerp(-pageHeight / 2, pageHeight / 2, i / (ringCount - 1));
  ring.position.set(0, 0.005, ringZ);
  notebookGroup.add(ring);
}
notebookGroup.rotation.y = Math.PI / 2;
notebookGroup.scale.set(0.3,0.3,0.3)
notebookGroup.position.set(0.8,4.2,0.6)
scene.add(notebookGroup);


const pencil = new THREE.Group();
const bodyLength = 2;  // length of the pencil body
const bodyWidth  = 0.2; // width of the pencil body
const bodyHeight = 0.2; // thickness of the pencil
const bodyGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyLength);
const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 }); // golden/yellow color
const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
pencil.add(bodyMesh);
const tipHeight = 0.4;
const tipRadius = 0.2; // matching the pencil body's width
const tipGeometry = new THREE.ConeGeometry(tipRadius, tipHeight, 4);
tipGeometry.translate(0, -tipHeight / 2, 0);
const tipMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // brown color for the tip
const tipMesh = new THREE.Mesh(tipGeometry, tipMaterial);
tipMesh.rotation.x = -Math.PI / 2;
tipMesh.position.z = -bodyLength / 2 - tipHeight;
pencil.add(tipMesh);
pencil.rotation.x = -Math.PI / 2;
pencil.position.set(0, bodyLength / 2 + tipHeight, 0);
pencil.position.set(2,4.2,3);
pencil.scale.set(0.3,0.3,0.3)
const steps = 5;  // Number of horizontal movements before reversing
const stepSizeX = 0.2; // Vertical drop per step
const stepSizeZ = 1.0; // Horizontal length of each step
const waypoints = [];
let x = 0;
let z = -stepSizeZ / 2;
let direction = 1;  // Controls left/right movement
for (let i = 0; i < steps; i++) {
  waypoints.push({ x, z });  // Add waypoint
  z += stepSizeZ * direction; // Move horizontally
  waypoints.push({ x, z });  // Add waypoint after moving
  x += stepSizeX;  // Drop down
  direction *= -1; // Reverse direction
}
const reversedWaypoints = [...waypoints].reverse();
waypoints.push(...reversedWaypoints);
pencil.position.set(waypoints[0].x, bodyHeight / 2 + tipHeight, waypoints[0].z);

const totalCycleTime = 12.0;
const segmentCount = waypoints.length - 1;
const segmentTime = totalCycleTime / segmentCount;

scene.add(pencil);


// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (g_lighting = "lamp1"){
        const mtlLoaderLamp = new MTLLoader();
        const objLoaderLamp = new OBJLoader();

        mtlLoaderLamp.load('./src/importedObj/28-lampara_escritorio/lampara_escritorio.mtl', (materials) => {
          materials.preload();
          objLoaderLamp.setMaterials(materials);
          objLoaderLamp.load('./src/importedObj/28-lampara_escritorio/lampara escritorio.obj', (lamp) => {
            scene.add(lamp);
            lamp.scale.set(0.005, 0.005, 0.005);
            lamp.position.set(2, 4, -2);
          });
        });
        const spotLampGeometry = new THREE.SphereGeometry(2, 32, 32);
        const spotLampMaterial = new THREE.MeshStandardMaterial({
          color: 0xdaa520,         // Yellowish color
          emissive: 0xdaa520,      // Self-lighting effect
          emissiveIntensity: 1.5,  // Control glow strength
        });
        const spotLamp = new THREE.Mesh(spotLampGeometry, spotLampMaterial);
        spotLamp.position.set(2, 6, -1.5);
        spotLamp.scale.set(0.1, 0.1, 0.1);
        scene.add(spotLamp);

        // Create the SpotLight
        const spotLampLight = new THREE.SpotLight(0xffaa00, 20, 50, Math.PI / 6, 0.5, 2); 
        // (color, intensity, distance, angle, penumbra, decay)

        // Set position and target
        spotLampLight.position.copy(spotLamp.position);
        spotLampLight.target.position.set(2, 0, 4.5); // Light points downward

        // Enable shadows for realism
        spotLampLight.castShadow = true;
        spotLampLight.shadow.mapSize.width = 2048;
        spotLampLight.shadow.mapSize.height = 2048;
        spotLampLight.shadow.camera.near = 0.1;
        spotLampLight.shadow.camera.far = 100;

        // Add light and its target to the scene
        scene.add(spotLampLight);
        scene.add(spotLampLight.target);
    } else if (g_lighting = "lamp2") {
        const sunLampGeometry = new THREE.SphereGeometry(2, 32, 32);
        const sunLampMaterial = new THREE.MeshStandardMaterial({
        color: 0xdaa520, // Yellowish color
        emissive: 0xdaa520, // Self-lighting effect
        emissiveIntensity: 1.5, // Control glow strength
        });
        const sunLamp = new THREE.Mesh(sunLampGeometry, sunLampMaterial);
        sunLamp.position.set(2, 5, -2);
        sunLamp.scale.set(0.4, 0.4, 0.4);
        scene.add(sunLamp);
        const sunLampLight = new THREE.PointLight(0xffaa00, 10, 100); // (color, intensity, distance)
        sunLampLight.position.copy(sunLamp.position);
        sunLampLight.castShadow = true;
        scene.add(sunLampLight);
    } else {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
    }

    if (g_poster1){
        const rectGeometry = new THREE.PlaneGeometry(2, 2); // Width 3, Height 2 (aspect ratio matches the image)
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('./src/posters/jazzCat.jpg');// Path to your image
        const rectMaterial = new THREE.MeshBasicMaterial({
            map: texture, 
            side: THREE.DoubleSide // Make sure both sides of the rectangle are visible
        });
        const jazzCat = new THREE.Mesh(rectGeometry, rectMaterial);
        jazzCat.position.set(4, 9, 5); // Position the rectangle
        jazzCat.rotation.y = - Math.PI/ 2;
        scene.add(jazzCat);
    }
    if (g_poster2){
        const rectGeometry2 = new THREE.PlaneGeometry(3, 2); // Width 3, Height 2 (aspect ratio matches the image)
        const textureLoader2 = new THREE.TextureLoader();
        const texture2 = textureLoader2.load('./src/posters/frankenstein.jpg'); // Path to your image
        const rectMaterial2 = new THREE.MeshBasicMaterial({
            map: texture2, 
            side: THREE.DoubleSide // Make sure both sides of the rectangle are visible
        });
        const frank = new THREE.Mesh(rectGeometry2, rectMaterial2);
        frank.position.set(4, 7, 1.5); // Position the rectangle
        frank.rotation.y = - Math.PI/ 2;
        scene.add(frank);
    }
    if (g_poster3){
        const rectGeometry3 = new THREE.PlaneGeometry(2, 3); // Width 3, Height 2 (aspect ratio matches the image)
        const textureLoader3 = new THREE.TextureLoader();
        const texture3 = textureLoader3.load('./src/posters/nirvana.jpg'); // Path to your image
        const rectMaterial3 = new THREE.MeshBasicMaterial({
            map: texture3, 
            side: THREE.DoubleSide // Make sure both sides of the rectangle are visible
        });
        const nirvana = new THREE.Mesh(rectGeometry3, rectMaterial3);
        nirvana.position.set(4, 8, -2); // Position the rectangle
        nirvana.rotation.y = - Math.PI/ 2;
        scene.add(nirvana);
    }
    if (g_poster4){
        const circleGeometry = new THREE.CircleGeometry(1, 32); // Radius of 1 and 32 segments
        const textureLoader4 = new THREE.TextureLoader();
        const texture4 = textureLoader4.load('./src/posters/pom.jpg'); // Path to your image
        const circleMaterial = new THREE.MeshBasicMaterial({
            map: texture4,         // Apply the loaded texture to the material
            side: THREE.DoubleSide,  // Make both sides of the circle visible
            transparent: true,    // Enable transparency (to handle circular images properly)
            alphaTest: 0.5       // Ensure transparency works well, adjust threshold as needed
        });
        const circle = new THREE.Mesh(circleGeometry, circleMaterial);
        circle.position.set(4, 6, 5); // Position the circle in the scene
        circle.rotation.y = - Math.PI/ 2;
        scene.add(circle);
    }
    if (g_poster5){
        const circleGeometry2 = new THREE.CircleGeometry(1, 32); // Radius of 1 and 32 segments
        const textureLoader5 = new THREE.TextureLoader();
        const texture5 = textureLoader4.load('./src/posters/cat.jpg'); // Path to your image
        const circleMaterial2 = new THREE.MeshBasicMaterial({
            map: texture5,         // Apply the loaded texture to the material
            side: THREE.DoubleSide,  // Make both sides of the circle visible
            transparent: true,    // Enable transparency (to handle circular images properly)
            alphaTest: 0.5       // Ensure transparency works well, adjust threshold as needed
        });
        const cat = new THREE.Mesh(circleGeometry2, circleMaterial2);
        cat.position.set(4, 9.5, 1.5); // Position the circle in the scene
        cat.rotation.y = - Math.PI/ 2;
        scene.add(cat);
    }
    if (g_books){
        const mtlLoaderBooks = new MTLLoader();
        const objLoaderBooks = new OBJLoader();
        mtlLoaderBooks.load('./src/importedObj/books/materials.mtl', (materials) => {
        materials.preload();
        objLoaderBooks.setMaterials(materials);
        objLoaderBooks.load('./src/importedObj/books/model.obj', (books) => {
            scene.add(books);
            books.rotation.y = - Math.PI/ 2;
            books.scale.set(15, 15, 15);
            books.position.set(3,4.3,3);
        });
        });
    }
    if (g_candle){
        const fbxLoader = new FBXLoader();
        fbxLoader.load('./src/importedObj/skull_candle.fbx', (candle) => {
            scene.add(candle);
            
            // Apply transformations
            candle.rotation.y = -Math.PI / 2;  // Rotate the shelf
            candle.scale.set(0.007, 0.007, 0.007);   // Scale it down
            candle.position.set(3, 4.75, 3); // Move it to position

            // Ensure materials are visible
            candle.traverse((child) => {
                if (child.isMesh) {
                    child.material.transparent = false;
                    child.material.needsUpdate = true;
                }
            });

        }, (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Loading progress
        }, (error) => {
            console.error('Error loading FBX:', error);
        });
    }
    if (g_clock){
        const mtlLoaderClock = new MTLLoader();
        const objLoaderClock = new OBJLoader();
        mtlLoaderClock.load('./src/importedObj/Alarm Clock/Alarm_Clock.mtl', (materials) => {
        materials.preload();
        objLoaderClock.setMaterials(materials);
        objLoaderClock.load('./src/importedObj/Alarm Clock/Alarm Clock.obj', (clock) => {
            scene.add(clock);
            clock.rotation.y = - Math.PI /2 ;
            clock.scale.set(.005, .005, .005);
            clock.position.set(2.5,4,-1);
        });
        });
    }
    if (g_calendar){
        const mtlLoaderCal = new MTLLoader();
        const objLoaderCal = new OBJLoader();
        mtlLoaderCal.load('./src/importedObj/Calendar/LowPoly_Calendar.mtl', (materials) => {
        materials.preload();
        objLoaderCal.setMaterials(materials);
        objLoaderCal.load('./src/importedObj/Calendar/LowPoly_Calendar.obj', (cal) => {
            scene.add(cal);
            cal.rotation.y = - Math.PI/ 2;
            cal.scale.set(.03, .03, .03);
            cal.position.set(3,5.5,3);
        });
        });
    }
    if (g_doll) {
        const mtlLoaderBear = new MTLLoader();
        const objLoaderBear = new OBJLoader();
        mtlLoaderBear.load('./src/importedObj/Bear-2/kuma.mtl', (materials) => {
        materials.preload();
        objLoaderBear.setMaterials(materials);
        objLoaderBear.load('./src/importedObj/Bear-2/kuma.obj', (bear) => {
            scene.add(bear);
            bear.rotation.y = - Math.PI/ 2;
            bear.scale.set(0.001, 0.001, 0.001);
            bear.position.set(4,5.3,3);
        });
        });

    }

    if (g_doWork) {
        const tCycle = (performance.now() * 0.001) % totalCycleTime;
        const segmentIndex = Math.floor(tCycle / segmentTime);
        const segmentT = (tCycle % segmentTime) / segmentTime;

        const startWP = waypoints[segmentIndex];
        const endWP = waypoints[segmentIndex + 1];

        pencil.position.x = THREE.MathUtils.lerp(startWP.x, endWP.x, segmentT);
        pencil.position.z = THREE.MathUtils.lerp(startWP.z, endWP.z, segmentT);
        pencil.position.y = 4.8;
    }


    // Update the controls for camera movement
    controls.update();

    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);
}

// Resize the renderer and camera when the window is resized
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Start the animation loop
animate();