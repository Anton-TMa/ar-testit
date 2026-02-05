import * as THREE from "https://unpkg.com/three@0.126.0/build/three.module.js";
import { ARButton } from "https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js";
import { FBXLoader } from "https://unpkg.com/three@0.126.0/examples/jsm/loaders/FBXLoader.js";

let camera, scene, renderer;

init();

function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);

  // Valot
  scene.add(new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1));
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 2, 3);
  scene.add(light);

  // FBX LATAUS
  const loader = new FBXLoader();
  
  // Polku ilman ../ jos kansio on samassa tasossa index.html kanssa
  loader.load("fbx/DoughNut_FBX.fbx", (object) => {
      
      // FBX-mallit ovat usein valtavia tai pikkiriikkisiä. 
      // Jos ei näy, kokeile (1, 1, 1) tai (0.1, 0.1, 0.1)
      object.scale.set(0.005, 0.005, 0.005);
      object.position.set(0, 0, -1);
      
      scene.add(object);
      console.log("FBX ladattu!");
    }, 
    (xhr) => console.log((xhr.loaded / xhr.total * 100) + "% ladattu"),
    (err) => console.error("FBX VIRHE:", err)
  );

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });

  document.body.appendChild(ARButton.createButton(renderer));
}
