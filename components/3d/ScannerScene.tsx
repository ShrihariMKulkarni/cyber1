'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ScannerScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 180;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 4.5);
    camera.lookAt(0, 0, 0);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Outer wireframe box
    const boxGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const boxEdges = new THREE.EdgesGeometry(boxGeo);
    const boxMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
    });
    const boxMesh = new THREE.LineSegments(boxEdges, boxMat);
    group.add(boxMesh);

    // 2. Inner pulsating core cube
    const innerGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // 3. Central glowing sphere
    const sphereGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(sphereMesh);

    // 4. Scanning laser plane
    const planeGeo = new THREE.PlaneGeometry(2.2, 2.2);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const laserPlane = new THREE.Mesh(planeGeo, planeMat);
    laserPlane.rotation.x = Math.PI / 2;
    group.add(laserPlane);

    // 5. Orbiting scan sparks
    const sparksCount = 40;
    const sparksArray = new Float32Array(sparksCount * 3);
    for (let i = 0; i < sparksCount * 3; i += 3) {
      sparksArray[i] = (Math.random() - 0.5) * 2.5;
      sparksArray[i + 1] = (Math.random() - 0.5) * 2.5;
      sparksArray[i + 2] = (Math.random() - 0.5) * 2.5;
    }
    const sparksGeo = new THREE.BufferGeometry();
    sparksGeo.setAttribute('position', new THREE.BufferAttribute(sparksArray, 3));
    const sparksMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const sparks = new THREE.Points(sparksGeo, sparksMat);
    group.add(sparks);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Rotate whole group
      group.rotation.y = time * 0.8;
      group.rotation.x = Math.sin(time * 0.4) * 0.3;

      // Pulse inner core
      const pulse = 1 + Math.sin(time * 3) * 0.15;
      innerMesh.scale.set(pulse, pulse, pulse);

      // Sweep laser scanline vertically
      laserPlane.position.y = Math.sin(time * 3.5) * 0.9;

      // Rotate sparks counter
      sparks.rotation.y = -time * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      boxGeo.dispose();
      boxEdges.dispose();
      boxMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      sparksGeo.dispose();
      sparksMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '200px',
        margin: '0 auto 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        position: 'relative',
      }}
    />
  );
}
