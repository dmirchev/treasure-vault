import { Sprite, Ticker } from "pixi.js";
import Mouse from "../core/Mouse";

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
  }

  starting() {
    Ticker.shared.add((delta) => {
      this.handle.angle += delta;
      this.shadow.angle += delta;
    });
  }
}
