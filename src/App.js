import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import Navbar from "./Navbar.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function App() {
  const containerRef = useRef();
  const [cubeColor, setCubeColor] = useState(0xffffff); // Initial color is white
  const [selectedObject, setSelectedObject] = useState("cube"); // Initial selected object is cube
  const [selectedObjectMesh, setSelectedObjectMesh] = useState(null); // Reference to the selected object's mesh
  const [objectSize, setObjectSize] = useState(1); // Initial object size
  const rendererRef = useRef(null); // Declare rendererRef to hold renderer instance

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer; // Store the renderer instance in the ref

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 1;
    controls.maxDistance = 10;

    // Object
    let mesh;
    switch (selectedObject) {
      case "cube":
        mesh = new THREE.Mesh(
          new THREE.BoxGeometry(objectSize, objectSize, objectSize),
          new THREE.MeshBasicMaterial({ color: cubeColor })
        );
        break;
      case "sphere":
        mesh = new THREE.Mesh(
          new THREE.SphereGeometry(objectSize / 2),
          new THREE.MeshBasicMaterial({ color: cubeColor })
        );
        break;
      case "pyramid":
        mesh = new THREE.Mesh(
          new THREE.ConeGeometry(objectSize, objectSize),
          new THREE.MeshBasicMaterial({ color: cubeColor })
        );
        break;
      case "cylinder":
        mesh = new THREE.Mesh(
          new THREE.CylinderGeometry(objectSize / 2, objectSize / 2, objectSize),
          new THREE.MeshBasicMaterial({ color: cubeColor })
        );
        break;
      case "torus":
        mesh = new THREE.Mesh(
          new THREE.TorusGeometry(objectSize / 2, objectSize / 4),
          new THREE.MeshBasicMaterial({ color: cubeColor })
        );
        break;
      // Add more objects here as needed
      default:
        mesh = new THREE.Mesh(
          new THREE.BoxGeometry(objectSize, objectSize, objectSize),
          new THREE.MeshBasicMaterial({ color: cubeColor })
        );
    }
    scene.add(mesh);
    setSelectedObjectMesh(mesh); // Store the selected object's mesh

    const animate = () => {
      requestAnimationFrame(animate);

      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;

      controls.update(); // Actualiza los controles en cada frame

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      const currentRenderer = rendererRef.current;
      const currentContainer = containerRef.current;
      if (currentRenderer && currentContainer) {
        currentContainer.removeChild(currentRenderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [cubeColor, selectedObject, objectSize]);

  const handleColorChange = (color) => {
    setCubeColor(color);
  };

  const handleObjectChange = (object) => {
    setSelectedObject(object);
  };

  const handleSizeChange = (size) => {
    setObjectSize(size);
  };

  const activateBorder = (object) => {
    if (selectedObjectMesh) {
      // Toggle wireframe
      selectedObjectMesh.material.wireframe = !selectedObjectMesh.material.wireframe;
    }
  };

  return (
    <div>
      <Navbar
        handleColorChange={handleColorChange}
        handleObjectChange={handleObjectChange}
        handleSizeChange={handleSizeChange} // Pass the function to Navbar
        activateBorder={activateBorder}
        objectSize={objectSize} // Pass the object size to Navbar
      />
      <div ref={containerRef} />
    </div>
  );
}

export default App;
