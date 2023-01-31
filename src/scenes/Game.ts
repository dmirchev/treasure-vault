import ParallaxBackground from "../prefabs/ParallaxBackground";
import { Player } from "../prefabs/Player";
import Scene from "../core/Scene";
import { Sprite } from "pixi.js";
import KeypadDisplayText from "../prefabs/KeypadDisplayText";
import {
  centerObjects,
  recenterSpriteInParent,
  recenterSpritesFullScreen,
} from "../utils/misc";
import { Handle } from "../prefabs/Handle";
import { alphaTween } from "../utils/animationmisc";
import { Debug } from "../utils/debug";

export default class Game extends Scene {
  name = "Game";

  private player: Player | undefined;
  private background: ParallaxBackground | undefined;

  private bg: Sprite | undefined;
  private keypad: KeypadDisplayText | undefined;
  private door: Sprite | undefined;
  private handle: Handle | undefined;

  async load() {
    // await this.utils.assetLoader.loadAssetsGroup("Game");
    /* this.background = new ParallaxBackground(config.backgrounds.forest);
    this.player = new Player();

    this.player.x = window.innerWidth / 2;
    this.player.y = window.innerHeight - this.player.height / 3;

    this.background.initPlayerMovement(this.player);

    this.addChild(this.background, this.player); */

    this.bg = Sprite.from("bg");
    this.keypad = new KeypadDisplayText("00:00", this.bg);

    centerObjects(this.bg);
    recenterSpritesFullScreen(this.bg);

    this.addChild(this.bg);

    this.door = Sprite.from("door");
    this.bg.addChild(this.door);
    recenterSpriteInParent(this.door, 0.009, -0.012);

    this.handle = new Handle();
    this.door.addChild(this.handle);
    recenterSpriteInParent(this.handle, -0.04, -0.01);

    Debug.log(this.sceneManager.lastSceneName);
    if (this.sceneManager.lastSceneName === "End") alphaTween(0, 1, this.door);
  }

  async unload() {
    if (this.handle) this.handle.unload();
  }

  onResize(width: number, height: number) {
    if (this.bg) recenterSpritesFullScreen(this.bg);
    if (this.door)
      alphaTween(1, 0, this.door, () => this.sceneManager.switchScene("End"));
  }
}
