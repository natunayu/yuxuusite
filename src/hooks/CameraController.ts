import { PerspectiveCamera, Vector3, Euler } from 'three';

export class CameraController {
  private camera: PerspectiveCamera;
  private targetPosition: Vector3;
  private currentPosition: Vector3;
  private smoothFactor: number;
  private rotation: Euler;

  constructor(camera: PerspectiveCamera, smoothFactor: number = 0.05) {
    this.camera = camera;
    this.targetPosition = camera.position.clone();
    this.currentPosition = camera.position.clone();
    this.rotation = new Euler();
    this.smoothFactor = smoothFactor;
  }

  update() {
    this.rotateCamera();
    this.camera.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.camera.position.copy(this.currentPosition);
  }

  setTargetPosition(x: number, y: number, z: number) {
    this.targetPosition.set(x, y, z);
  }

  setSmoothFactor(factor: number) {
    this.smoothFactor = factor;
  }

  getCamera(): PerspectiveCamera {
    return this.camera;
  }

  rotateCamera(yRotation: number = 0.01, xRotation: number = -0.01) {
  this.rotation.y += yRotation * this.smoothFactor;
  this.rotation.x += xRotation * this.smoothFactor;
  }
}

export default CameraController;