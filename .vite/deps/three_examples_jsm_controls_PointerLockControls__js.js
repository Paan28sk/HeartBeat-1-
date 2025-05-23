import {
  Controls,
  Euler,
  Vector3
} from "./chunk-73BEQU36.js";

// node_modules/three/examples/jsm/controls/PointerLockControls.js
var _euler = new Euler(0, 0, 0, "YXZ");
var _vector = new Vector3();
var _changeEvent = { type: "change" };
var _lockEvent = { type: "lock" };
var _unlockEvent = { type: "unlock" };
var _MOUSE_SENSITIVITY = 2e-3;
var _PI_2 = Math.PI / 2;
var PointerLockControls = class extends Controls {
  /**
   * Constructs a new controls instance.
   *
   * @param {Camera} camera - The camera that is managed by the controls.
   * @param {?HTMLDOMElement} domElement - The HTML element used for event listeners.
   */
  constructor(camera, domElement = null) {
    super(camera, domElement);
    this.isLocked = false;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.pointerSpeed = 1;
    this._onMouseMove = onMouseMove.bind(this);
    this._onPointerlockChange = onPointerlockChange.bind(this);
    this._onPointerlockError = onPointerlockError.bind(this);
    if (this.domElement !== null) {
      this.connect(this.domElement);
    }
  }
  connect(element) {
    super.connect(element);
    this.domElement.ownerDocument.addEventListener("mousemove", this._onMouseMove);
    this.domElement.ownerDocument.addEventListener("pointerlockchange", this._onPointerlockChange);
    this.domElement.ownerDocument.addEventListener("pointerlockerror", this._onPointerlockError);
  }
  disconnect() {
    this.domElement.ownerDocument.removeEventListener("mousemove", this._onMouseMove);
    this.domElement.ownerDocument.removeEventListener("pointerlockchange", this._onPointerlockChange);
    this.domElement.ownerDocument.removeEventListener("pointerlockerror", this._onPointerlockError);
  }
  dispose() {
    this.disconnect();
  }
  getObject() {
    console.warn("THREE.PointerLockControls: getObject() has been deprecated. Use controls.object instead.");
    return this.object;
  }
  /**
   * Returns the look direction of the camera.
   *
   * @param {Vector3} v - The target vector that is used to store the method's result.
   * @return {Vector3} The normalized direction vector.
   */
  getDirection(v) {
    return v.set(0, 0, -1).applyQuaternion(this.object.quaternion);
  }
  /**
   * Moves the camera forward parallel to the xz-plane. Assumes camera.up is y-up.
   *
   * @param {number} distance - The signed distance.
   */
  moveForward(distance) {
    if (this.enabled === false) return;
    const camera = this.object;
    _vector.setFromMatrixColumn(camera.matrix, 0);
    _vector.crossVectors(camera.up, _vector);
    camera.position.addScaledVector(_vector, distance);
  }
  /**
   * Moves the camera sidewards parallel to the xz-plane.
   *
   * @param {number} distance - The signed distance.
   */
  moveRight(distance) {
    if (this.enabled === false) return;
    const camera = this.object;
    _vector.setFromMatrixColumn(camera.matrix, 0);
    camera.position.addScaledVector(_vector, distance);
  }
  /**
   * Activates the pointer lock.
   *
   * @param {boolean} [unadjustedMovement=false] - Disables OS-level adjustment for mouse acceleration, and accesses raw mouse input instead.
   * Setting it to true will disable mouse acceleration.
   */
  lock(unadjustedMovement = false) {
    this.domElement.requestPointerLock({
      unadjustedMovement
    });
  }
  /**
   * Exits the pointer lock.
   */
  unlock() {
    this.domElement.ownerDocument.exitPointerLock();
  }
};
function onMouseMove(event) {
  if (this.enabled === false || this.isLocked === false) return;
  const camera = this.object;
  _euler.setFromQuaternion(camera.quaternion);
  _euler.y -= event.movementX * _MOUSE_SENSITIVITY * this.pointerSpeed;
  _euler.x -= event.movementY * _MOUSE_SENSITIVITY * this.pointerSpeed;
  _euler.x = Math.max(_PI_2 - this.maxPolarAngle, Math.min(_PI_2 - this.minPolarAngle, _euler.x));
  camera.quaternion.setFromEuler(_euler);
  this.dispatchEvent(_changeEvent);
}
function onPointerlockChange() {
  if (this.domElement.ownerDocument.pointerLockElement === this.domElement) {
    this.dispatchEvent(_lockEvent);
    this.isLocked = true;
  } else {
    this.dispatchEvent(_unlockEvent);
    this.isLocked = false;
  }
}
function onPointerlockError() {
  console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
}
export {
  PointerLockControls
};
//# sourceMappingURL=three_examples_jsm_controls_PointerLockControls__js.js.map
