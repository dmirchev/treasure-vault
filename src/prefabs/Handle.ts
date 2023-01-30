import { Point, Sprite, Ticker } from "pixi.js";
import Mouse from "../core/Mouse";
import { Debug } from "../utils/debug";

export class Handle extends Sprite {
  private mouse = Mouse.getInstance();

  private handle: Sprite;
  get Handle(): Sprite {
    return this.handle;
  }
  shadow: Sprite;

  constructor() {
    super();

    this.handle = Sprite.from("handle");
    this.handle.anchor.set(0.5);

    this.shadow = Sprite.from("handleShadow");
    this.shadow.anchor.set(0.5);
    this.shadow.x += 20;
    this.shadow.y += 30;

    this.addChild(this.shadow, this.handle);

    // this.starting();

    this.mouse.onAction(({ action, buttonState, position }) => {
      if (buttonState === "pressed") this.onActionPress(action, position);
      else if (buttonState === "drag") this.onActionDrag(action, position);
      else if (buttonState === "released") this.onActionRelease(action, position);
    });
  }

  private onActionPress(action: keyof typeof Mouse.actions, position: Point) {
    Debug.log(`${action}: ${position}`);
  }

  onActionDrag(action: keyof typeof Mouse.actions, position: Point) {
    Debug.log(`${action}: ${position}`);
  }

  onActionRelease(action: keyof typeof Mouse.actions, position: Point) {
    Debug.log(`${action}: ${position}`);
  }

  starting() {
    Ticker.shared.add((delta) => {
      this.handle.angle += delta;
      this.shadow.angle += delta;
    });
  }
}
