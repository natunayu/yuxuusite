import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import CameraController from '../hooks/CameraController';

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [starCount, setStarCount] = useState<number>(1000); // 星の数の初期値を設定

  useEffect(() => {
    if (!mountRef.current) return;

    // シーン、カメラ、レンダラーの作成と設定
    const scene: THREE.Scene = new THREE.Scene();
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // オフスクリーンレンダリングのセットアップ
    const rtTexture: THREE.WebGLRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    const fullscreenQuad: THREE.Mesh = new THREE.Mesh(
      
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshBasicMaterial({ map: rtTexture.texture, transparent: true })
    );
    const orthoCamera: THREE.OrthographicCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const fullscreenScene: THREE.Scene = new THREE.Scene();
    fullscreenScene.add(fullscreenQuad);

    camera.position.z = 0; // カメラの初期位置を設定

    // 星を生成する関数
    const createStars = (count: number = 1000, minDistance: number = 100): THREE.Points => {
      const geometry: THREE.BufferGeometry = new THREE.BufferGeometry(); // 星のジオメトリを作成
      const vertices: number[] = []; // 頂点座標の配列
      const colors: number[] = []; // 頂点色の配列

      // 指定された数の星を生成
      for (let i = 0; i < count; i++) {
        let x: number, y: number, z: number;
        // 指定された最小距離以上になるまでランダムな座標を生成
        do {
          x = (Math.random() - 0.5) * 2000;
          y = (Math.random() - 0.5) * 2000;
          z = (Math.random() - 0.5) * 2000;
        } while (Math.sqrt(x * x + y * y + z * z) < minDistance);

        vertices.push(x, y, z); // 頂点座標を配列に追加

        // ランダムな色を生成
        const color: THREE.Color = new THREE.Color();
        //(色相, 彩度0~1, 明度0~1)
        color.setHSL(Math.random() * 0.1 + 0.5, Math.random() * 0.1 + 0.7, Math.sin(Math.random()) + 0.3); 
        colors.push(color.r, color.g, color.b); // 頂点色を配列に追加
      }

      // ジオメトリに頂点座標と色を設定
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

      // ポイントマテリアルを作成
      const material: THREE.PointsMaterial = new THREE.PointsMaterial({
        size: 2, // 星のサイズを小さくする
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      // 星のポイントを作成
      const stars: THREE.Points = new THREE.Points(geometry, material);
      stars.userData.originalPositions = vertices.slice(); // オリジナルの頂点座標を保持
      stars.userData.originalColors = colors.slice(); // オリジナルの頂点色を保持
      return stars;
    };

    // デバイスの性能に応じて星の数を調整する関数
    const getOptimalStarCount = (): number => {
      const { width, height } = renderer.getSize(new THREE.Vector2());
      const pixelRatio: number = renderer.getPixelRatio();
      const totalPixels: number = width * height * pixelRatio * pixelRatio;

      // 高解像度の場合に星の数を制限
      if (width >= 1080 && height >= 720) {
        return Math.min(Math.floor(totalPixels / 1000), 1000);
      }
      return Math.min(Math.floor(totalPixels / 400), 5000);
    };

    // 星をチャンクごとに生成してシーンに追加
    const chunkSize: number = 10; // 一度に生成する星の数
    const starChunks: THREE.Points[] = []; // チャンクごとの星を保持する配列

    const addStars = (): void => {
      const count: number = getOptimalStarCount();
      for (let i = 0; i < count; i += chunkSize) {
        const starChunk: THREE.Points = createStars(Math.min(chunkSize, count - i), 50);
        starChunks.push(starChunk);
        scene.add(starChunk);
      }
    };

    addStars(); // 星を生成してシーンに追加

    const cameraController: CameraController = new CameraController(camera); // カメラコントローラーの設定

    const fps: number = 40;
    const interval: number = 1000 / fps;
    let then: number = performance.now();

    const speed: number = 0.003;
    //let position: { x: number; y: number; z: number } = { x: 0, y: 0, z: 5 };

    const animate = (now: number): void => {
      requestAnimationFrame(animate);

      const delta: number = now - then;

      if (delta > interval) {
        then = now - (delta % interval);

        /*
        position.x += speed;
        position.y += speed * 0.7;
        position.z += speed;

        // 位置をリセット（循環移動）
        if (position.x > 5) position.x = -3;
        if (position.y > 2) position.y = -2;
        if (position.z > 10) position.z = 0;

        cameraController.setTargetPosition(position.x, position.y, position.z); // カメラの位置を更新
        */

        cameraController.update(); // カメラコントローラーを更新

        renderer.setRenderTarget(rtTexture); // オフスクリーンレンダリング
        renderer.render(scene, camera);
        renderer.setRenderTarget(null);

        renderer.render(fullscreenScene, orthoCamera); // フルスクリーンクアッドを使用してメインシーンにレンダリング
      }
    };

    animate(performance.now()); // アニメーションを開始

    // ウィンドウリサイズ時の処理
    const onWindowResize = (): void => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      rtTexture.setSize(window.innerWidth, window.innerHeight);

      // ウィンドウリサイズ時に再レンダリング
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', onWindowResize, false); // リサイズイベントをリッスン

    // クリーンアップ関数
    return (): void => {
      window.removeEventListener('resize', onWindowResize); // リサイズイベントを削除
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement); // レンダラーをDOMから削除
      }
      rtTexture.dispose(); // テクスチャを解放
      fullscreenQuad.geometry.dispose(); // ジオメトリを解放
      (fullscreenQuad.material as THREE.Material).dispose(); // マテリアルを解放
    };
  }, []); // starCountが変わったら再レンダリング

  return <div ref={mountRef} className="three-container" />; // レンダラーをマウントするコンテナを返す
};

export default ThreeScene;