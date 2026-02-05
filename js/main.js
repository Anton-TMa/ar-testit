import * as THREE from "https://unpkg.com/three@0.126.0/build/three.module.js";
import { ARButton } from "https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js";
import { FBXLoader } from "https://unpkg.com/three@0.126.0/examples/jsm/loaders/FBXLoader.js";

let camera, scene, renderer;

init();

function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  
  scene = new THREE.Scene();

 
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    20
  );

  
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);

  
  const light1 = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light1);

  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(1, 2, 3);
  scene.add(light2);

  // FBX LOADER
const loader = new FBXLoader();

loader.load(
  "/fbx/DoughNut_FBX.fbx",
  (object) => {

    object.scale.set(0.005, 0.005, 0.005);

    object.position.set(0, 0, -1);

    scene.add(object);
  },
  (xhr) => {
    console.log("Lataus:", (xhr.loaded / xhr.total) * 100 + "%");
  },
  (error) => {
    console.error("FBX VIRHE:", error);
  }
);


  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });

  document.body.appendChild(ARButton.createButton(renderer));
}

