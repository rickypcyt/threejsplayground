import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import Navbar from "./Navbar.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function App() {
  const containerRef = useRef(); // Reference to the container for the renderer
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
    containerRef.current.appendChild(renderer.domElement); // Append renderer to the container
    rendererRef.current = renderer; // Store the renderer instance in the ref

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping for smooth movements
    controls.dampingFactor = 0.25; // Damping factor for damping
    controls.screenSpacePanning = false; // Disable screen space panning
    controls.maxPolarAngle = Math.PI / 2; // Set max polar angle for controls
    controls.minDistance = 1; // Set min distance for controls
    controls.maxDistance = 10; // Set max distance for controls

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

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      mesh.rotation.x += 0.01; // Rotate the mesh on x-axis
      mesh.rotation.y += 0.01; // Rotate the mesh on y-axis

      controls.update(); // Update controls in each frame

      renderer.render(scene, camera); // Render the scene
    };

    animate(); // Start animation loop

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize); // Listen for window resize events

    // Cleanup function
    return () => {
      const currentRenderer = rendererRef.current;
      const currentContainer = containerRef.current;
      if (currentRenderer && currentContainer) {
        currentContainer.removeChild(currentRenderer.domElement); // Remove renderer from the container
      }
      window.removeEventListener("resize", handleResize); // Remove event listener for window resize
    };
  }, [cubeColor, selectedObject, objectSize]); // Re-run effect when cubeColor, selectedObject, or objectSize change

  // Handler function to change cube color
  const handleColorChange = (color) => {
    setCubeColor(color);
  };

  // Handler function to change selected object
  const handleObjectChange = (object) => {
    setSelectedObject(object);
  };

  // Handler function to change object size
  const handleSizeChange = (size) => {
    setObjectSize(size);
  };

  // Handler function to activate object border
  const activateBorder = () => {
    if (selectedObjectMesh) {
      // Toggle wireframe
      selectedObjectMesh.material.wireframe = !selectedObjectMesh.material.wireframe;
    }
  };

  // Render component
  return (
    <div>
      {/* Navbar component */}
      <Navbar
        handleColorChange={handleColorChange} // Pass color change handler function
        handleObjectChange={handleObjectChange} // Pass object change handler function
        handleSizeChange={handleSizeChange} // Pass size change handler function
        activateBorder={activateBorder} // Pass activate border handler function
        objectSize={objectSize} // Pass object size to Navbar
      />
      {/* Container for the renderer */}
      <div ref={containerRef} />
    </div>
  );
}

export default App; // Export App component
