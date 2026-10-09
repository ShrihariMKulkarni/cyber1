'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 7.5;

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Geodesic Outer Shield Wireframe
    const shieldGeo = new THREE.IcosahedronGeometry(2.4, 2);
    const shieldEdges = new THREE.EdgesGeometry(shieldGeo);
    const shieldMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const shieldMesh = new THREE.LineSegments(shieldEdges, shieldMat);
    coreGroup.add(shieldMesh);

    // 2. Inner Digital Sphere (Points)
    const sphereGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const sphereMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const innerPoints = new THREE.Points(sphereGeo, sphereMat);
    coreGroup.add(innerPoints);

    // 3. Central Core Glowing Octahedron
    const octGeo = new THREE.OctahedronGeometry(0.8, 0);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    coreGroup.add(octMesh);

    // 4. Dual Rotating Cyber Rings
    const ring1Geo = new THREE.TorusGeometry(3.2, 0.015, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.8, 0.012, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = -Math.PI / 5;
    coreGroup.add(ring2);

    // 5. Orbiting Threat & Security Nodes
    const nodesCount = 12;
    const nodeSpheres: { mesh: THREE.Mesh; angle: number; radius: number; speed: number; yOffset: number }[] = [];
    const colors = [0x00f0ff, 0x10b981, 0xef4444, 0x38bdf8, 0xf59e0b];

    for (let i = 0; i < nodesCount; i++) {
      const nodeColor = colors[i % colors.length];
      const nodeGeo = new THREE.SphereGeometry(0.06 + Math.random() * 0.04, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: nodeColor,
        blending: THREE.AdditiveBlending,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      scene.add(nodeMesh);

      nodeSpheres.push({
        mesh: nodeMesh,
        angle: (i / nodesCount) * Math.PI * 2,
        radius: 2.8 + Math.random() * 1.6,
        speed: (0.3 + Math.random() * 0.4) * (i % 2 === 0 ? 1 : -1),
        yOffset: (Math.random() - 0.5) * 1.8,
      });
    }

    // 6. Deep Space Cyber Dust / Floating Packets
    const particlesCount = 600;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 22;
      posArray[i + 1] = (Math.random() - 0.5) * 16;
      posArray[i + 2] = (Math.random() - 0.5) * 12;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.025,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 2;
      mouseY = y * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      coreGroup.rotation.y = time * 0.18 + targetX * 0.4;
      coreGroup.rotation.x = Math.sin(time * 0.1) * 0.1 - targetY * 0.3;

      const scale = 1 + Math.sin(time * 2.5) * 0.08;
      octMesh.scale.set(scale, scale, scale);
      octMesh.rotation.y -= delta * 0.8;
      octMesh.rotation.z += delta * 0.4;

      ring1.rotation.z = time * 0.25;
      ring2.rotation.z = -time * 0.2;

      innerPoints.rotation.y = -time * 0.1;

      nodeSpheres.forEach((node) => {
        node.angle += node.speed * delta;
        const x = Math.cos(node.angle) * node.radius;
        const z = Math.sin(node.angle) * node.radius;
        const y = node.yOffset + Math.sin(time * 2 + node.angle) * 0.4;
        node.mesh.position.set(x, y, z);
      });

      particleSystem.rotation.y = time * 0.03;
      particleSystem.rotation.x = time * 0.015;

      camera.position.x = targetX * 0.8;
      camera.position.y = -targetY * 0.6;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      shieldGeo.dispose();
      shieldEdges.dispose();
      shieldMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      octGeo.dispose();
      octMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 1s ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 75%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
