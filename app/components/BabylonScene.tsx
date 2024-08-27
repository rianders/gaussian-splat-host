'use client'

import React, { useEffect, useRef } from 'react';
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Color3, GaussianSplattingMesh } from '@babylonjs/core';

const BabylonScene: React.FC<{ splatUrl: string }> = ({ splatUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const engine = new Engine(canvasRef.current, true);
      const scene = new Scene(engine);

      scene.clearColor = new Color3(0.1, 0.1, 0.1);

      const camera = new ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 4, 10, Vector3.Zero(), scene);
      camera.attachControl(canvasRef.current, true);
      camera.wheelPrecision = 100;
      camera.inertia = 0.97;

      new HemisphericLight('light1', new Vector3(0, 1, 0), scene);

      const loadSplat = async () => {
        try {
          const gs = new GaussianSplattingMesh("Splat", null, scene);
          await gs.loadFileAsync(splatUrl);
          gs.position.y = 1.7;
          console.log("Gaussian Splat loaded successfully");
        } catch (error) {
          console.error("Error loading Gaussian Splat:", error);
        }
      };

      loadSplat();

      engine.runRenderLoop(() => {
        scene.render();
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
  }, [splatUrl]);

  return (
    <div className="relative w-full h-screen">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default BabylonScene;
