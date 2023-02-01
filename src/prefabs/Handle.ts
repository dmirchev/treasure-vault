import { Point, Sprite } from "pixi.js";
import Mouse from "../core/Mouse";
import "@pixi/math-extras";
import {
  angleBetweenVectors,
  calculateAngle,
  calculateVector,
  inverseTransform,
} from "../utils/mathmisc";
import { rotationTween } from "../utils/animationmisc";
import { sound } from "@pixi/sound";

export class Handle extends Sprite {
  private mouse = Mouse.getInstance();

  handle: Sprite;
  shadow: Sprite;

  segmentAngle: number;

  pressedAngle = 0;
  pressedPoint = new Point();

  hasPressed = false;

  accumulatedAngle = 0;
  dragAngle = 0;

  currentSegment = 0;
  currentSegmentAngle = 0;

  onSegmentClickCallback: ((direction: number) => void) | undefined;

  constructor(callback?: ((direction: number) => void) | undefined) {
    super();

    this.handle = Sprite.from("handle");
    this.handle.anchor.set(0.5);

    this.shadow = Sprite.from("handleShadow");
    this.shadow.anchor.set(0.5);
    this.shadow.x += 20;
    this.shadow.y += 30;

    this.addChild(this.shadow, this.handle);

    this.mouse.onAction(({ action, buttonState, position }) => {
      if (buttonState === "pressed") this.onActionPress(action, position);
      else if (buttonState === "drag") this.onActionDrag(action, position);
      else if (buttonState === "released") this.onActionRelease(action);
    });

    this.segmentAngle = Math.PI / 3;

    this.onSegmentClickCallback = callback;

    this.Init();
  }

  public Init() {
    this.pressedAngle = 0;
    this.pressedPoint = new Point();

    this.hasPressed = false;
    this.interactive = true;

    this.accumulatedAngle = 0;
    this.dragAngle = 0;

    this.currentSegment = 0;
    this.currentSegmentAngle = 0;

    this.updateHandleRotation(0);
  }

  unload() {
    this.mouse.offAction();
  }

  private setPressedValues(position: Point) {
    this.pressedAngle =
      calculateAngle(this.inverseTransformToHandle(position).normalize()) -
      this.handle.rotation;
    this.pressedPoint = position;
  }

  private onActionPress(action: keyof typeof Mouse.actions, position: Point) {
    if (action == "PRIMARY" && this.interactive) {
      if (this.hasPressedOnHandle(position, 0.5)) {
        this.hasPressed = true;
        this.setPressedValues(position);
      }
    }
  }

  onActionDrag(action: keyof typeof Mouse.actions, position: Point) {
    if (action == "PRIMARY") {
      if (this.hasPressed) {
        // Check If the Mouse is near the Center of the Handle
        if (this.hasPressedOnHandle(position, 0.125)) {
          // Reset Clicked Position;
          this.setPressedValues(position);
          this.addToAccumulatedAngle();
          return;
        }

        const positionNormal =
          this.inverseTransformToHandle(position).normalize();
        const pressedPointNormal = this.inverseTransformToHandle(
          this.pressedPoint
        ).normalize();

        this.rotateHandle(positionNormal);

        // Angle Between the Pressed Vector and the Dragged Vector
        const angle = angleBetweenVectors(pressedPointNormal, positionNormal);

        const rotaionDirection = Math.sign(
          pressedPointNormal.cross(positionNormal)
        );

        this.dragAngle = rotaionDirection * angle;

        const tempAccumulatedAngle = this.accumulatedAngle + this.dragAngle;

        const nextLeftAngle = this.currentSegmentAngle - this.segmentAngle;
        const nextRightAngle = this.currentSegmentAngle + this.segmentAngle;

        if (
          tempAccumulatedAngle > nextRightAngle ||
          tempAccumulatedAngle < nextLeftAngle
        ) {
          this.currentSegmentAngle += this.segmentAngle * rotaionDirection;

          // Reset Clicked Position;
          this.setPressedValues(position);
          this.addToAccumulatedAngle();

          this.currentSegment = Math.round(
            this.currentSegmentAngle / this.segmentAngle
          );

          if (this.onSegmentClickCallback)
            this.onSegmentClickCallback(rotaionDirection);

          sound.play("click");
        }
      }
    }
  }

  forceStop() {
    this.hasPressed = false;
    this.mouse.offAction();
  }

  onActionRelease(action: keyof typeof Mouse.actions) {
    if (action == "PRIMARY") {
      this.hasPressed = false;
      this.addToAccumulatedAngle();
    }
  }

  addToAccumulatedAngle() {
    this.accumulatedAngle += this.dragAngle;
    this.dragAngle = 0;
  }

  hasPressedOnHandle(position: Point, scale: number) {
    const handleOuterMagnitude = this.handle.getBounds().height * scale;
    const pointFromCenterToInputPositiom =
      this.inverseTransformToHandle(position);

    return pointFromCenterToInputPositiom.magnitude() <= handleOuterMagnitude;
  }

  inverseTransformToHandle(position: Point) {
    return inverseTransform(position, this.handle);
  }

  rotateHandle(positionNormal: Point) {
    // Sprite Rotation Angle
    const dragedAngle = calculateAngle(positionNormal);
    const diff = dragedAngle - this.pressedAngle;

    // diff can be above PI
    this.updateHandleRotation(calculateAngle(calculateVector(diff)));
  }

  updateHandleRotation(angle: number) {
    this.handle.rotation = angle;
    this.shadow.rotation = angle;
  }

  public startCrazySpin(callback?: (() => void) | undefined) {
    this.hasPressed = false;
    this.interactive = false;

    const crazySpinStartRotation = 2 * (Math.PI * 10);
    const duration = 3;

    rotationTween(
      this.handle.rotation - crazySpinStartRotation,
      0,
      duration,
      this.handle,
      callback
    );

    rotationTween(
      this.shadow.rotation - crazySpinStartRotation,
      0,
      duration,
      this.shadow
    );

    sound.play("chain");
  }
}
