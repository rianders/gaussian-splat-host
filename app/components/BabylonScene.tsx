'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Color3, GaussianSplattingMesh } from '@babylonjs/core';

interface BabylonSceneProps {
  initialSplatPath: string;
  onSplatLoad?: (file: File) => void;
}

const BabylonScene: React.FC<BabylonSceneProps> = ({ initialSplatPath, onSplatLoad }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scene, setScene] = useState<Scene | null>(null);
  const [currentSplat, setCurrentSplat] = useState<GaussianSplattingMesh | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      const engine = new Engine(canvasRef.current, true);
      const newScene = new Scene(engine);
      setScene(newScene);

      newScene.clearColor = new Color3(0.1, 0.1, 0.1);

      const camera = new ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 4, 10, Vector3.Zero(), newScene);
      camera.attachControl(canvasRef.current, true);
      camera.wheelPrecision = 100;
      camera.inertia = 0.97;

      new HemisphericLight('light1', new Vector3(0, 1, 0), newScene);

      // Load initial splat
      loadSplat(initialSplatPath);

      engine.runRenderLoop(() => {
        newScene.render();
      });

      window.addEventListener('resize', () => {
        engine.resize();
      });

      return () => {
        engine.dispose();
        window.removeEventListener('resize', () => engine.resize());
      };
    }
  }, [initialSplatPath]);

  const loadSplat = async (url: string) => {
    if (!scene) return;

    // Remove the current splat if it exists
    if (currentSplat) {
      currentSplat.dispose();
      setCurrentSplat(null);
    }

    try {
      const gs = new GaussianSplattingMesh("Splat", null, scene);
      await gs.loadFileAsync(url);
      gs.position.y = 1.7;
      setCurrentSplat(gs);
      console.log("Splat loaded successfully");
    } catch (error) {
      console.error("Error loading splat:", error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      loadSplat(url);
      if (onSplatLoad) {
        onSplatLoad(file);
      }
    }
  };

  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    if (event.dataTransfer?.files) {
      const file = event.dataTransfer.files[0];
      if (file && (file.name.endsWith('.splat') || file.name.endsWith('.ply'))) {
        const url = URL.createObjectURL(file);
        loadSplat(url);
        if (onSplatLoad) {
          onSplatLoad(file);
        }
      } else {
        console.warn('Please drop a .splat or .ply file.');
        alert('Please drop a .splat or .ply file.');
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '90vh' }}>
      <input type="file" accept=".splat,.ply" onChange={handleFileUpload} />
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%' }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
      {isDragging && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '24px',
            pointerEvents: 'none',
          }}
        >
          Drop .splat or .ply file here
        </div>
      )}
    </div>
  );
};

export default BabylonScene;