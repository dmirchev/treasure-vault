import { Point, Sprite } from "pixi.js";
import Mouse from "../core/Mouse";
import "@pixi/math-extras";

type Rotation = {
  normilizedDirection: Point;
  angle: number;
};

export class Handle extends Sprite {
  private mouse = Mouse.getInstance();

  private handle: Sprite;
  get Handle(): Sprite {
    return this.handle;
  }
  shadow: Sprite;

  handleRotation: Rotation | undefined;

  constructor() {
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
      else if (buttonState === "released")
        this.onActionRelease(action, position);
    });
  }

  unload() {
    this.mouse.offAction();
  }

  private onActionPress(action: keyof typeof Mouse.actions, position: Point) {
    if (action == "PRIMARY") {
      const magnitude = this.handle.getBounds().height * 0.5;
      const pointFromCenterToInputPositiom =
        this.getDirectionFromCenterToPosition(position);

      // If Pressing on the Hande
      if (pointFromCenterToInputPositiom.magnitude() <= magnitude) {
        this.handleRotation = {
          normilizedDirection: pointFromCenterToInputPositiom.normalize(),
          angle:
            this.calculateAngle(pointFromCenterToInputPositiom) -
            this.handle.rotation,
        };
      }
    }
  }

  onActionDrag(action: keyof typeof Mouse.actions, position: Point) {
    if (action == "PRIMARY") {
      this.updateRotation(
        this.calculateAngle(this.getDirectionFromCenterToPosition(position))
      );
    }
  }

  onActionRelease(action: keyof typeof Mouse.actions, position: Point) {
    if (action == "PRIMARY") {
      //   Debug.log(`${action}: ${position}`);
      // switchScene("End");
    }
  }

  getHandleGlobalCenterPoint(): Point {
    return this.handle.toGlobal(this.handle.position);
  }

  getDirectionFromCenterToPosition(position: Point): Point {
    const centerGlobal = this.getHandleGlobalCenterPoint();
    return position.subtract(centerGlobal);
  }

  calculateAngle(direction: Point): number {
    const normilizedDirection = direction.normalize();
    return Math.atan2(normilizedDirection.y, normilizedDirection.x);
  }

  updateRotation(angle: number) {
    const finalAngle =
      angle - (this.handleRotation ? this.handleRotation.angle : 0);
    this.handle.rotation = finalAngle;
    this.shadow.rotation = finalAngle;
  }
}
