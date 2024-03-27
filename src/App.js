import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import Navbar from './Navbar.js';

function App() {
  const containerRef = useRef();
  const [cubeColor, setCubeColor] = useState(0xffffff); // Initial color is white
  const [selectedObject, setSelectedObject] = useState('cube'); // Initial selected object is cube
  const rendererRef = useRef(null); // Declare rendererRef to hold renderer instance

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer; // Store the renderer instance in the ref

    // Object
    let mesh;
    switch (selectedObject) {
      case 'cube':
        mesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: cubeColor }));
        break;
      case 'sphere':
        mesh = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial({ color: cubeColor }));
        break;
      case 'pyramid':
        mesh = new THREE.Mesh(new THREE.ConeGeometry(), new THREE.MeshBasicMaterial({ color: cubeColor }));
        break;
      // Add more objects here as needed
      default:
        mesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: cubeColor }));
    }
    scene.add(mesh);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      const currentRenderer = rendererRef.current;
      if (currentRenderer) {
        containerRef.current.removeChild(currentRenderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [cubeColor, selectedObject]);

  const handleColorChange = (color) => {
    setCubeColor(color);
  };

  const handleObjectChange = (object) => {
    setSelectedObject(object);
  };

  return (
    <div>
      <Navbar handleColorChange={handleColorChange} handleObjectChange={handleObjectChange} />
      <div ref={containerRef} />
    </div>
  );
}

export default App;
