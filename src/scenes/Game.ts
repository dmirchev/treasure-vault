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
import CombinationManager from "../core/CombinationManager";

export default class Game extends Scene {
  name = "Game";

  private player: Player | undefined;
  private background: ParallaxBackground | undefined;

  private bg: Sprite | undefined;
  private keypad: KeypadDisplayText | undefined;
  private door: Sprite | undefined;
  private handle: Handle | undefined;

  private combinationManager: CombinationManager | undefined;

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

    this.handle = new Handle((direction: number) =>
      this.onHandleSegmentClick(direction)
    );
    this.door.addChild(this.handle);
    recenterSpriteInParent(this.handle, -0.04, -0.01);

    this.combinationManager = new CombinationManager(3, 1, 9);
    this.combinationManager.setSequence();

    if (this.sceneManager.lastSceneName === "End") alphaTween(0, 1, this.door);
  }

  async unload() {
    if (this.handle) this.handle.unload();
  }

  onResize(width: number, height: number) {
    if (this.bg) recenterSpritesFullScreen(this.bg);
  }

  onHandleSegmentClick(direction: number) {
    if (
      this.combinationManager?.checkSequence(
        direction,
        () => this.onCombinationFail(),
        () => this.onCombinationSuccess()
      )
    ) {
      this.handle?.forceStop();
    }
  }

  onCombinationFail() {
    this.handle?.Init();
    this.combinationManager?.setSequence();
  }

  onCombinationSuccess() {
    alphaTween(1, 0, this.door, () => this.sceneManager.switchScene("End"));
  }
}
