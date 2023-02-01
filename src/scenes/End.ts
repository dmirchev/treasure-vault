import { sound } from "@pixi/sound";
import { Sprite } from "pixi.js";
import Scene from "../core/Scene";
import KeypadDisplayText from "../prefabs/KeypadDisplayText";
import { Sparkles } from "../prefabs/Sparkles";
import { alphaTween, alphaTweenSine } from "../utils/animationmisc";
import {
  centerObjects,
  recenterSpriteInParent,
  recenterSpritesFullScreen,
  wait,
} from "../utils/misc";

export default class End extends Scene {
  name = "End";

  private bg: Sprite | undefined;
  private doorOpen: Sprite | undefined;
  private doorOpenShadow: Sprite | undefined;

  private goldSparkles: Sparkles | undefined;

  async load() {
    this.bg = Sprite.from("bg");
    const keypad = new KeypadDisplayText("NICE", this.bg);
    alphaTweenSine(keypad);

    centerObjects(this.bg);
    recenterSpritesFullScreen(this.bg);

    this.addChild(this.bg);

    this.doorOpenShadow = Sprite.from("doorOpenShadow");
    this.bg.addChild(this.doorOpenShadow);
    recenterSpriteInParent(this.doorOpenShadow, 0.26, 0.005);

    this.doorOpen = Sprite.from("doorOpen");
    this.doorOpenShadow.addChild(this.doorOpen);
    recenterSpriteInParent(this.doorOpen, -0.05, -0.02);

    this.goldSparkles = new Sparkles(this.bg, "blink");

    alphaTween(0, 1, this.doorOpenShadow, () =>
      wait(2).then(() =>
        alphaTween(1, 0, this.doorOpenShadow, () =>
          this.sceneManager.switchScene("Game")
        )
      )
    );
  }

  async unload() {
    sound.play("close");
  }

  async start() {
    sound.play("win");
  }

  onResize() {
    if (this.bg) recenterSpritesFullScreen(this.bg);
  }

  update(delta: number) {
    if (this.goldSparkles) this.goldSparkles.update(delta);
  }
}
