// Import necessary Three.js libraries (assuming you're using a module bundler like Webpack, or including Three.js from a CDN)
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

// Set up lighting
const ambientLight = new THREE.AmbientLight(0x404040, 1); 
// diiferent colors here (toggle)
    // default light == overhead light 
    // pinkish purple (lmap imported) --> lamp 1
    // yellow sunset (sphere on desk (basic shape) )--> lamp 2
scene.add(ambientLight);
    // make it so that there is diffuse as well.... 

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional light
directionalLight.position.set(5, 5, 5); // Light position
scene.add(directionalLight);
    // one of the lamps moves around ? 

const pointLight = new THREE.PointLight(0xff0000, 1, 100); // Point light (red)
pointLight.position.set(0, 5, 0); // Position the point light
scene.add(pointLight);

// Set up a skybox (add images to the array of textures for the sides of the skybox)
const loader = new THREE.CubeTextureLoader();
// blank 
scene.background = loader.load([
  'path/to/px.jpg', 'path/to/nx.jpg', // Positive X and Negative X faces
  'path/to/py.jpg', 'path/to/ny.jpg', // Positive Y and Negative Y faces
  'path/to/pz.jpg', 'path/to/nz.jpg'  // Positive Z and Negative Z faces
]);

// Create a 3D object (e.g., a cube)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 5 differnt picture frames/posters you can add of remove with different pix on them...
    // 2 circle (cyclinder basic shape)
    // 3 rectangle (rectangle basic shape)

// table base


// add lamp ?

// add little shelf? 3 levels 
    // in shelf you can add 
    // first level
        // sonny angel (imported)
        // bowl (imported)
    // second level 
        // smiski
        // candle // cylinder (basic shape)
    // third level 
        // mini calender 
        //tech deck

// add mirror?

// mini cat (made myself) that licks its paw 
    // this is where i will have 20 primary shapes... 





// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube to animate it
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

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
