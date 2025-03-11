

// Import necessary Three.js libraries (assuming you're using a module bundler like Webpack, or including Three.js from a CDN)
import * as THREE from 'https://esm.sh/three';
import { OrbitControls } from 'https://esm.sh/three/examples/jsm/controls/OrbitControls.js';
import { MTLLoader } from 'https://esm.sh/three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'https://esm.sh/three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'https://esm.sh/three/examples/jsm/loaders/FBXLoader.js';
import { Reflector } from 'https://esm.sh/three/examples/jsm/objects/Reflector.js';

// Create the scene
const scene = new THREE.Scene();

// Set up the camera with a perspective projection
const camera1 = new THREE.PerspectiveCamera(
  50,                  // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1,                 // Near clipping plane
  1000                 // Far clipping plane
);
camera1.position.set(0, 1, 10); // Position the camera

const camera2 = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera2.position.set(2, 1, 1); // Position the camera

// Set up the WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera1, renderer.domElement);
controls.target.set(0, 5, 0); 

const controls2 = new OrbitControls(camera2, renderer.domElement);
controls2.target.set(0, 5, 0); 

var g_cam1 = true;
var g_cam2 = false;

document.getElementById("camera").addEventListener('click', function() { 
  if (g_cam1) {
    g_cam1 = false;
    g_cam2 = true;
  } else {g_cam1 = true; g_cam2 = true;}
});



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




var g_mirror = false;


document.getElementById("mirror").addEventListener('click', function() { 
  g_mirror = !g_mirror;
});

let mirrorGroup = new THREE.Group();
// Create mirror geometry (e.g., a 5x5 plane)
const mirrorGeometry = new THREE.PlaneGeometry(5, 5);

// Create the mirror using the Reflector class
const mirror = new Reflector(mirrorGeometry, {
  clipBias: 0.003,
  textureWidth: window.innerWidth * window.devicePixelRatio,
  textureHeight: window.innerHeight * window.devicePixelRatio,
  color: 0x777777
});

// Position the mirror (for example, on a wall)
mirror.position.set(3, 5, 0);  // Adjust these values as needed
mirror.scale.set(0.3,0.3,0.3); 
mirror.rotateY(-Math.PI/2);          // Rotate if necessary (e.g., to face the scene)

mirrorGroup.add(mirror)
const bodyLength1 = 2;  // length of the pencil body
const bodyWidth1  = 2; // width of the pencil body
const bodyHeight1 = 0.2; // thickness of the pencil
const bodyGeometry1 = new THREE.BoxGeometry(bodyWidth1, bodyHeight1, bodyLength1);
const bodyMaterial1 = new THREE.MeshStandardMaterial({ color: 0xffd700 }); // golden/yellow color
const bodyMesh1 = new THREE.Mesh(bodyGeometry1, bodyMaterial1);
bodyMesh1.rotateZ(-Math.PI/2); 
bodyMesh1.position.set(3.2, 5, 0);  
mirrorGroup.add(bodyMesh1)

scene.add(mirrorGroup);
mirrorGroup.visible = false;




var g_doWork = false;
document.getElementById("doWork").addEventListener('click', function() { 
  g_doWork = !g_doWork;
});





var g_books = false;
var g_candle= false;
var g_clock = false;
var g_bear = false;
var g_calendar = false;

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
  g_bear = !g_bear;
});
document.getElementById("calendar").addEventListener('click', function() { 
  g_calendar = !g_calendar;

});

let bearGroup = new THREE.Group();
const mtlLoaderBear = new MTLLoader();
const objLoaderBear = new OBJLoader();
mtlLoaderBear.load('./src/importedObj/Bear-2/kuma.mtl', (materials) => {
  materials.preload();
  objLoaderBear.setMaterials(materials);
  objLoaderBear.load('./src/importedObj/Bear-2/kuma.obj', (bear) => {
      bear.rotation.y = - Math.PI/ 2;
      bear.scale.set(0.001, 0.001, 0.001);
      bear.position.set(4,5.3,3);
      bearGroup.add(bear)
      scene.add(bearGroup);
      bearGroup.visible = false;
  });
});

let booksGroup = new THREE.Group();
const mtlLoaderBooks = new MTLLoader();
const objLoaderBooks = new OBJLoader();
mtlLoaderBooks.load('./src/importedObj/books/materials.mtl', (materials) => {
  materials.preload();
  objLoaderBooks.setMaterials(materials);
  objLoaderBooks.load('./src/importedObj/books/model.obj', (books) => {
      books.rotation.y = - Math.PI/ 2;
      books.scale.set(15, 15, 15);
      books.position.set(3,4.3,3);
      booksGroup.add(books);
      scene.add(booksGroup);
      booksGroup.visible = false;
  });
});


let calGroup = new THREE.Group();
const mtlLoaderCal = new MTLLoader();
const objLoaderCal = new OBJLoader();
mtlLoaderCal.load('./src/importedObj/Calendar/LowPoly_Calendar.mtl', (materials) => {
  materials.preload();
  objLoaderCal.setMaterials(materials);
  objLoaderCal.load('./src/importedObj/Calendar/LowPoly_Calendar.obj', (cal) => {
      cal.rotation.y = - Math.PI/ 2;
      cal.scale.set(.03, .03, .03);
      cal.position.set(3,5.5,3);
      calGroup.add(cal)
      scene.add(calGroup);
      calGroup.visible = false;
  });
});

let clockGroup = new THREE.Group();
const mtlLoaderClock = new MTLLoader();
const objLoaderClock = new OBJLoader();
mtlLoaderClock.load('./src/importedObj/Alarm Clock/Alarm_Clock.mtl', (materials) => {
  materials.preload();
  objLoaderClock.setMaterials(materials);
  objLoaderClock.load('./src/importedObj/Alarm Clock/Alarm Clock.obj', (clock) => {
      clock.rotation.y = - Math.PI /2 ;
      clock.scale.set(.005, .005, .005);
      clock.position.set(2.5,4,-1);
      clockGroup.add(clock)
      scene.add(clockGroup);
      clockGroup.visible = false;
  });
});



let candleGroup = new THREE.Group();
const fbxLoader = new FBXLoader();
fbxLoader.load('./src/importedObj/skull_candle.fbx', (candle) => {
    
    
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
    candleGroup.add(candle);
    scene.add(candleGroup);
    candleGroup.visible = false;
}, (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Loading progress
}, (error) => {
    console.error('Error loading FBX:', error);
});





var g_lighting = "overhead";
var g_overhead = true;
var g_lamp1 = false;
var g_lamp2 = false;

document.getElementById("overhead").addEventListener('click', function() { 
  g_overhead = !g_overhead;
  console.log(g_overhead);
});
document.getElementById("lamp1").addEventListener('click', function() { 
  g_lamp1 = !g_lamp1;
});
document.getElementById("lamp2").addEventListener('click', function() { 
  g_lamp2 = !g_lamp2;
});


let bigLightGroup = new THREE.Group();

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
bigLightGroup.add(light);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
bigLightGroup.add(ambientLight);
bigLightGroup.visible = true;
scene.add(bigLightGroup);



let lamp1Group;

const mtlLoaderLamp = new MTLLoader();
const objLoaderLamp = new OBJLoader();

mtlLoaderLamp.load('./src/importedObj/28-lampara_escritorio/lampara_escritorio.mtl', (materials) => {
  materials.preload();
  objLoaderLamp.setMaterials(materials);
  objLoaderLamp.load('./src/importedObj/28-lampara_escritorio/lampara escritorio.obj', (lampMesh) => {
    // Set lamp mesh properties
    lampMesh.scale.set(0.005, 0.005, 0.005);
    lampMesh.position.set(2, 4, -2);

    // Create a group to hold the lamp mesh and its light
    lamp1Group = new THREE.Group();
    lamp1Group.add(lampMesh);

    // Create a visual indicator for the lamp (optional)
    const spotLampGeometry = new THREE.SphereGeometry(2, 32, 32);
    const spotLampMaterial = new THREE.MeshStandardMaterial({
      color: 0xdaa520,
      emissive: 0xdaa520,
      emissiveIntensity: 1.5,
    });
    const spotLamp = new THREE.Mesh(spotLampGeometry, spotLampMaterial);
    spotLamp.position.set(2, 6, -1.5);
    spotLamp.scale.set(0.1, 0.1, 0.1);
    lamp1Group.add(spotLamp);

    // Create the SpotLight associated with the lamp
    const spotLampLight = new THREE.SpotLight(0xffaa00, 20, 50, Math.PI / 6, 0.5, 2);
    spotLampLight.position.copy(spotLamp.position);
    spotLampLight.target.position.set(2, 0, 4.5);
    spotLampLight.castShadow = true;
    spotLampLight.shadow.mapSize.width = 2048;
    spotLampLight.shadow.mapSize.height = 2048;
    spotLampLight.shadow.camera.near = 0.1;
    spotLampLight.shadow.camera.far = 100;
    lamp1Group.add(spotLampLight);
    lamp1Group.add(spotLampLight.target);

    // Add the complete lamp group to the scene and hide it initially.
    scene.add(lamp1Group);
    lamp1Group.visible = false;
  });
});



let lamp2Group = new THREE.Group(); // Initialize the group
const sunLampGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunLampMaterial = new THREE.MeshStandardMaterial({
color: 0xdaa520, // Yellowish color
emissive: 0xdaa520, // Self-lighting effect
emissiveIntensity: 1.5, // Control glow strength
});
const sunLamp = new THREE.Mesh(sunLampGeometry, sunLampMaterial);
sunLamp.position.set(2, 5, -2);
sunLamp.scale.set(0.4, 0.4, 0.4);
lamp2Group.add(sunLamp);
const sunLampLight = new THREE.PointLight(0xffaa00, 10, 100); // (color, intensity, distance)
sunLampLight.position.copy(sunLamp.position);
sunLampLight.castShadow = true;
lamp2Group.add(sunLampLight);
scene.add(lamp2Group);
lamp2Group.visible = false;





var g_nirvana = false;
var g_frank= false;
var g_cat = false;
var g_jazzCat = false;
var g_pom = false;

document.getElementById("circle1").addEventListener('click', function() { 
  g_cat = !g_cat;
});
document.getElementById("circle2").addEventListener('click', function() { 
  g_pom = !g_pom;
});
document.getElementById("rect1").addEventListener('click', function() { 
  g_nirvana = !g_nirvana;
});
document.getElementById("rect2").addEventListener('click', function() { 
  g_frank = !g_frank;
});
document.getElementById("rect3").addEventListener('click', function() { 
  g_jazzCat = !g_jazzCat;

});




let jazzCatGroup = new THREE.Group(); 
const rectGeometry = new THREE.BoxGeometry(2,0.2, 2); // Width 3, Height 2 (aspect ratio matches the image)
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./src/posters/jazzCat.jpg');// Path to your image
const rectMaterial = new THREE.MeshBasicMaterial({
    map: texture, 
    side: THREE.DoubleSide // Make sure both sides of the rectangle are visible
});
const jazzCat = new THREE.Mesh(rectGeometry, rectMaterial);
jazzCat.position.set(4, 9, 5); // Position the rectangle
jazzCat.rotation.z = Math.PI/2;
jazzCat.rotation.x = Math.PI/2;
jazzCatGroup.add(jazzCat);
scene.add(jazzCatGroup);
jazzCatGroup.visible = false;

let frankGroup = new THREE.Group();
const rectGeometry2 = new THREE.BoxGeometry(3,0.2, 2); // Width 3, Height 2 (aspect ratio matches the image)
const textureLoader2 = new THREE.TextureLoader();
const texture2 = textureLoader2.load('./src/posters/frankenstein.jpg'); // Path to your image
const rectMaterial2 = new THREE.MeshBasicMaterial({
    map: texture2, 
    side: THREE.DoubleSide // Make sure both sides of the rectangle are visible
});
const frank = new THREE.Mesh(rectGeometry2, rectMaterial2);
frank.position.set(4, 7, 1.5); // Position the rectangle
frank.rotation.z = Math.PI/2;
frank.rotation.x = Math.PI/2;
frankGroup.add(frank);
scene.add(frankGroup);
frankGroup.visible = false;


let nirvanaGroup = new THREE.Group();
const rectGeometry3 = new THREE.BoxGeometry(2,0.2 ,3); // Width 3, Height 2 (aspect ratio matches the image)
const textureLoader3 = new THREE.TextureLoader();
const texture3 = textureLoader3.load('./src/posters/nirvana.jpg'); // Path to your image
const rectMaterial3 = new THREE.MeshBasicMaterial({
    map: texture3, 
    side: THREE.DoubleSide // Make sure both sides of the rectangle are visible
});
const nirvana = new THREE.Mesh(rectGeometry3, rectMaterial3);
nirvana.position.set(4, 8, -2); // Position the rectangle
//nirvana.rotation.y = - Math.PI;
nirvana.rotation.z = Math.PI/2;
nirvana.rotation.x = Math.PI/2;
nirvanaGroup.add(nirvana)
scene.add(nirvanaGroup);
nirvanaGroup.visible = false;

let pomGroup = new THREE.Group();
const circleGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 32); // Radius of 1 and 32 segments
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
circle.rotation.z = Math.PI/2;
//circle.rotation.x = Math.PI/2;
pomGroup.add(circle)
scene.add(pomGroup);
pomGroup.visible = false;

let catGroup = new THREE.Group();
const circleGeometry2 = new THREE.CylinderGeometry(1,1,0.1, 32); // Radius of 1 and 32 segments
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
cat.rotation.z = Math.PI/2;
catGroup.add(cat)
scene.add(catGroup);
catGroup.visible = false;




const notebookGroup = new THREE.Group();

const pageWidth = 4;   // width of one page
const pageHeight = 6;  // height of one page

// For a flat notebook on a desk, the pages lie in the XZ plane (Y is up)
// We'll use slight Y offsets to avoid z-fighting between pages

// ----- Left Page (Left side; its RIGHT edge is the binding edge) -----
// Create a plane geometry; translate geometry so its right edge is at x=0.
const leftPageGeometry = new THREE.BoxGeometry(pageWidth, 0.1, pageHeight);
leftPageGeometry.translate(-pageWidth / 2, 0, 0);
const leftPageMaterial = new THREE.MeshStandardMaterial({
  color: 0xfefbd8, // paper-like color
  side: THREE.DoubleSide
});
const leftPage = new THREE.Mesh(leftPageGeometry, leftPageMaterial);
// Rotate to lie flat (in the XZ plane)
//leftPage.rotation.x = -Math.PI / 2;
// Position so that its binding edge (right edge) is at x = 0
leftPage.position.set(0, 0.001, 0);
notebookGroup.add(leftPage);

// ----- Right Page (Right side; its LEFT edge is the binding edge) -----
// Translate geometry so its left edge is at x=0.
const rightPageGeometry = new THREE.BoxGeometry(pageWidth,0.1, pageHeight);
rightPageGeometry.translate(pageWidth / 2, 0, 0);
const rightPageMaterial = new THREE.MeshStandardMaterial({
  color: 0xfefbd8,
  side: THREE.DoubleSide
});
const rightPage = new THREE.Mesh(rightPageGeometry, rightPageMaterial);
//rightPage.rotation.x = -Math.PI / 2;
// Slightly offset on Y to avoid z-fighting with the left page.
rightPage.position.set(0, -0.001, 0);
notebookGroup.add(rightPage);

// ----- Spiral Binding Rings -----
// Create several small rings along the binding edge (x=0) mimicking a spiral notebook.
const ringCount = 10;
for (let i = 0; i < ringCount; i++) {
  const ringGeometry = new THREE.TorusGeometry(0.2, 0.05, 16, 100);
  const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    side: THREE.DoubleSide
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  
  // Rotate so the ring lies flat in the XZ plane.
  //ring.rotation.x = -Math.PI / 2;
  // Rotate the ring 90 degrees around the Z axis:
  ring.rotation.z = Math.PI / 2;
  
  // Distribute rings evenly along the page height (the Z axis after pages are flat).
  const ringZ = THREE.MathUtils.lerp(-pageHeight / 2, pageHeight / 2, i / (ringCount - 1));
  ring.position.set(0, 0.005, ringZ);
  notebookGroup.add(ring);
}
// ----- Rotate the Notebook Group -----
// Rotate the entire group 90 degrees (π/2 radians) around the Y axis.
notebookGroup.rotation.y = Math.PI / 2;
notebookGroup.scale.set(0.3,0.3,0.3)
notebookGroup.position.set(0.8,4.2,0.6)

// Add the notebook group to the scene.
scene.add(notebookGroup);

// Optional: Add a helper to visualize the light
// const lightHelper = new THREE.PointLightHelper(sunLampLight, 1);
// scene.add(lightHelper);

const cubeTextureLoader = new THREE.CubeTextureLoader();
const skyboxTexture = cubeTextureLoader.load([
  './src/walls/wall.jpg',   // Right
  './src/walls/wall.jpg',   // Left
  './src/walls/ceiling.jpg', // Top
  './src/walls/floor.jpg',   // Bottom
  './src/walls/wall.jpg',   // Front
  './src/walls/wall.jpg'    // Back
]);
scene.background = skyboxTexture;


const pencil = new THREE.Group();

// -- Pencil Body (Rectangle) --
// The body is a BoxGeometry whose long axis (length) is along the z axis.
const bodyLength = 2;  // length of the pencil body
const bodyWidth  = 0.2; // width of the pencil body
const bodyHeight = 0.2; // thickness of the pencil
const bodyGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyLength);
const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 }); // golden/yellow color
const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
pencil.add(bodyMesh);

// -- Pencil Tip (Pyramid) --
// Use ConeGeometry with 4 radial segments to mimic a pyramid tip.
const tipHeight = 0.4;
const tipRadius = 0.2; // matching the pencil body's width
const tipGeometry = new THREE.ConeGeometry(tipRadius, tipHeight, 4);
// By default, the cone's base is centered and its apex points along +Y.
// Translate the geometry so the base is at y=0.
tipGeometry.translate(0, -tipHeight / 2, 0);
const tipMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // brown color for the tip
const tipMesh = new THREE.Mesh(tipGeometry, tipMaterial);

// Rotate the tip so that its long axis is along the z axis (matching the pencil body).
tipMesh.rotation.x = -Math.PI / 2;
// Position the tip so that its base aligns with the end of the pencil body.
// The pencil body extends from -bodyLength/2 to +bodyLength/2 along z, so place the tip at the negative end.
tipMesh.position.z = -bodyLength / 2 - tipHeight;
pencil.add(tipMesh);

// ----- Reorient the Pencil Vertically -----
// The pencil was built with its long axis along z. Rotate it about the x axis by -90°
// so that the z axis aligns with -y. This makes the pencil stand upright with the tip pointing down.
pencil.rotation.x = -Math.PI / 2;

// ----- Positioning -----
// We want the pencil to "write" on a paper lying on the floor (y=0). 
// Position the pencil so that its tip touches (or nearly touches) the floor.
// (The tip’s world position is affected by the rotation; here we adjust the pencil group’s position.)
pencil.position.set(0, bodyLength / 2 + tipHeight, 0);
pencil.position.set(2,4.2,3);
pencil.scale.set(0.3,0.3,0.3)


// ----- Define the Writing Path -----
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

// Mirror the waypoints in reverse order to return to the start
const reversedWaypoints = [...waypoints].reverse();
waypoints.push(...reversedWaypoints);

// Set the pencil's starting position
pencil.position.set(waypoints[0].x, bodyHeight / 2 + tipHeight, waypoints[0].z);
pencil.position.set(1,4.3,0);
// pencil.rotation.y = Math.PI / 2 ;

scene.add(pencil);

// ----- Animate the Pencil Along the Path -----
const totalCycleTime = 12.0;
const segmentCount = waypoints.length - 1;
const segmentTime = totalCycleTime / segmentCount;



let coffeeGroup = new THREE.Group();
const cylinderGeometryBase = new THREE.CylinderGeometry(0.5,0.2,0.1,32);
const cylinderMaterialBase = new THREE.MeshStandardMaterial({ color: 0xfaf9f6 });
const cylinderBase = new THREE.Mesh(cylinderGeometryBase, cylinderMaterialBase);
cylinderBase.position.set(1.5,4.2,2.5);
scene.add(cylinderBase);

const cylinderGeometrymug = new THREE.CylinderGeometry(0.4,0.3,0.1,32);
const cylinderMaterialmug = new THREE.MeshStandardMaterial({ color: 0x000000 });
const cylindermug = new THREE.Mesh(cylinderGeometrymug, cylinderMaterialmug);
cylindermug.position.set(1.5,4.3,2.5);
scene.add(cylindermug);

const cylinderGeometrytop = new THREE.CylinderGeometry(0.4,0.4,0.2,32);
const cylinderMaterialtop = new THREE.MeshStandardMaterial({ color: 0x000000 });
const cylindertop = new THREE.Mesh(cylinderGeometrytop, cylinderMaterialtop);
cylindertop.position.set(1.5,4.45,2.5);
scene.add(cylindertop);

const cylinderGeometrydrink = new THREE.CylinderGeometry(0.35,0.35,0.01,32);
const cylinderMaterialdrink = new THREE.MeshStandardMaterial({ color: 0xe8d4ba });
const cylinderdrink = new THREE.Mesh(cylinderGeometrydrink, cylinderMaterialdrink);
cylinderdrink.position.set(1.5,4.56,2.5);
scene.add(cylinderdrink);

const ringGeometryhandle = new THREE.TorusGeometry(0.1, 0.03, 16, 100);
const ringMaterialhandle = new THREE.MeshStandardMaterial({color: 0x000000});
const handle = new THREE.Mesh(ringGeometryhandle, ringMaterialhandle);
handle.rotation.y = Math.PI / 2;
handle.position.set(1.5,4.4,2.9);
scene.add(handle);

function animate() {
  requestAnimationFrame(animate);
  if (g_lamp1) {
    if (lamp1Group) lamp1Group.visible = true;
  }  else {if (lamp1Group) lamp1Group.visible = false;}
  if (g_lamp2) {
    if (lamp2Group) lamp2Group.visible = true;
  } else {if (lamp2Group) lamp2Group.visible = false;}
  if (g_overhead) {
    if (bigLightGroup) bigLightGroup.visible = true;
  } else { if (bigLightGroup) bigLightGroup.visible = false;}

  if (g_nirvana ) {
    if (nirvanaGroup) nirvanaGroup.visible = true;
  }  else { if (nirvanaGroup) nirvanaGroup.visible = false;}
  if (g_pom) {
    if (pomGroup) pomGroup.visible = true;
  } else {if (pomGroup) pomGroup.visible = false;}
  if (g_cat) {
    if (catGroup) catGroup.visible = true;
  } else { if (catGroup) catGroup.visible = false;}
  if (g_frank) {
    if (frankGroup) frankGroup.visible = true;
  } else { if (frankGroup) frankGroup.visible = false;}
  if (g_jazzCat) {
    if (jazzCatGroup) jazzCatGroup.visible = true;
  } else { if (jazzCatGroup) jazzCatGroup.visible = false;}
  
  if (g_bear ) {
    if (bearGroup) bearGroup.visible = true;
  }  else { if (bearGroup) bearGroup.visible = false;}
  if (g_candle) {
    if (candleGroup) candleGroup.visible = true;
  } else {if (candleGroup) candleGroup.visible = false;}
  if (g_books) {
    if (booksGroup) booksGroup.visible = true;
  } else { if (booksGroup) booksGroup.visible = false;}
  if (g_clock) {
    if (clockGroup) clockGroup.visible = true;
  } else { if (clockGroup) clockGroup.visible = false;}
  if (g_calendar) {
    if (calGroup) calGroup.visible = true;
  } else { if (calGroup) calGroup.visible = false;}

  if (g_mirror) {
    if (mirrorGroup) mirrorGroup.visible = true;
  } else { if (mirrorGroup) mirrorGroup.visible = false;}

  if (g_doWork){
    pencil.rotation.y = Math.PI / 4 ;
    const tCycle = (performance.now() * 0.001) % totalCycleTime;
    const segmentIndex = Math.floor(tCycle / segmentTime);
    const segmentT = (tCycle % segmentTime) / segmentTime;

    const startWP = waypoints[segmentIndex];
    const endWP = waypoints[segmentIndex + 1];

    pencil.position.x = THREE.MathUtils.lerp(startWP.x, endWP.x, segmentT);
    pencil.position.z = THREE.MathUtils.lerp(startWP.z, endWP.z, segmentT);
    pencil.position.y = 4.8;
  } else {
    pencil.rotation.y = Math.PI / 2 ;
  }
  if (g_cam1){
    renderer.render(scene, camera1);
  } else { renderer.render(scene, camera2);}
  
}
animate();
// Resize the renderer and camera when the window is resized
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Start the animation loop
animate();
