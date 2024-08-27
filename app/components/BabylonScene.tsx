import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Color3, GaussianSplattingMesh } from '@babylonjs/core';
import { PLYFileLoader } from '@babylonjs/loaders';

interface BabylonSceneProps {
  splatUrl: string;
}

const BabylonScene: React.FC<BabylonSceneProps> = ({ splatUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSplat = useCallback(async (scene: Scene, url: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (url.endsWith('.ply')) {
        PLYFileLoader.load(scene, url);
      } else {
        const gs = new GaussianSplattingMesh("Splat", null, scene);
        await gs.loadFileAsync(url);
        gs.position.y = 1.7;
      }
      
      console.log("File loaded successfully");
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading file:", error);
      setError("Failed to load the file. Please try again.");
      setIsLoading(false);
    }
  }, []);

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

      loadSplat(scene, splatUrl);

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
  }, [splatUrl, loadSplat]);

  return (
    <div className="relative w-full h-screen" role="region" aria-label="3D Splat Viewer">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10" aria-live="polite">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white" aria-label="Loading"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-800 bg-opacity-50 z-10" aria-live="assertive">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full" tabIndex={0} aria-label="3D Splat Viewer Canvas" />
    </div>
  );
};

export default BabylonScene;