import { Sprite } from "pixi.js";
import Scene from "../core/Scene";
import KeypadDisplayText from "../prefabs/KeypadDisplayText";
import { Sparkles } from "../prefabs/Sparkles";
import {
  centerObjects,
  recenterSpriteInParent,
  recenterSpritesFullScreen,
} from "../utils/misc";

export default class End extends Scene {
  name = "End";

  private bg: Sprite | undefined;
  private doorOpen: Sprite | undefined;
  private doorOpenShadow: Sprite | undefined;

  async load() {
    this.bg = Sprite.from("bg");
    new KeypadDisplayText("NICE", this.bg);

    centerObjects(this.bg);
    recenterSpritesFullScreen(this.bg);

    this.addChild(this.bg);

    this.doorOpenShadow = Sprite.from("doorOpenShadow");
    this.bg.addChild(this.doorOpenShadow);
    recenterSpriteInParent(this.doorOpenShadow, 0.26, 0.005);

    this.doorOpen = Sprite.from("doorOpen");
    this.doorOpenShadow.addChild(this.doorOpen);
    recenterSpriteInParent(this.doorOpen, -0.05, -0.02);

    new Sparkles(this.bg, "blink");
  }

  onResize() {
    if (this.bg) recenterSpritesFullScreen(this.bg);
  }
}
