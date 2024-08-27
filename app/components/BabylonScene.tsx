'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Color4, GaussianSplattingMesh } from '@babylonjs/core';

interface BabylonSceneProps {
  initialSplatPath: string;
  onSplatLoad?: (file: File) => void;
}

const BabylonScene: React.FC<BabylonSceneProps> = ({ initialSplatPath, onSplatLoad }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scene, setScene] = useState<Scene | null>(null);
  const [currentSplat, setCurrentSplat] = useState<GaussianSplattingMesh | null>(null);

  const loadSplat = useCallback(async (url: string) => {
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
      if (onSplatLoad) {
        // Create a mock File object since we don't have the actual File
        const mockFile = new File([""], url.split('/').pop() || "unknown", { type: "application/octet-stream" });
        onSplatLoad(mockFile);
      }
    } catch (error) {
      console.error("Error loading splat:", error);
    }
  }, [scene, currentSplat, onSplatLoad]);

  useEffect(() => {
    if (canvasRef.current) {
      const engine = new Engine(canvasRef.current, true);
      const newScene = new Scene(engine);
      setScene(newScene);

      newScene.clearColor = new Color4(0.1, 0.1, 0.1, 1);

      const camera = new ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 4, 10, Vector3.Zero(), newScene);
      camera.attachControl(canvasRef.current, true);
      camera.wheelPrecision = 100;
      camera.inertia = 0.97;

      new HemisphericLight('light1', new Vector3(0, 1, 0), newScene);

      engine.runRenderLoop(() => {
        newScene.render();
      });

      const handleResize = () => {
        engine.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        engine.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (scene && initialSplatPath) {
      loadSplat(initialSplatPath);
    }
  }, [scene, initialSplatPath, loadSplat]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default BabylonScene;