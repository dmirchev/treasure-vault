import { Sprite } from "pixi.js";
import Scene from "../core/Scene";
import KeypadDisplayText from "../prefabs/KeypadDisplayText";
import { centerObjects, recenterSpritesFullScreen } from "../utils/misc";

export default class Loading extends Scene {
  name = "Loading";

  private bg: Sprite | undefined;

  async load() {
    await this.utils.assetLoader.loadAssetsGroup("Loading");

    this.bg = Sprite.from("vault");
    new KeypadDisplayText("Load", this.bg);

    centerObjects(this.bg);
    recenterSpritesFullScreen(this.bg);

    this.addChild(this.bg);
  }

  async start() {
    await this.utils.assetLoader.loadAssetsGroup("Game");
  }

  onResize() {
    if (this.bg) recenterSpritesFullScreen(this.bg);
  }
}
