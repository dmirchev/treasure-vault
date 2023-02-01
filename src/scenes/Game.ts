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
import CombinationManager from "../core/CombinationManager";
import { Timer } from "../prefabs/Timer";
import { sound } from "@pixi/sound";

export default class Game extends Scene {
  name = "Game";

  private bg: Sprite | undefined;
  private keypad: KeypadDisplayText | undefined;
  private door: Sprite | undefined;
  private handle: Handle | undefined;

  private combinationManager: CombinationManager | undefined;

  private timer: Timer | undefined;

  private isReady: boolean | undefined;

  async load() {
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
    this.timer = new Timer();

    this.isReady = false;
  }

  init() {
    sound.play("lock");

    this.handle?.Init();
    this.combinationManager?.setSequence();
    this.timer?.resetTime();

    this.isReady = true;
  }

  async start() {
    if (this.sceneManager.lastSceneName === "End")
      alphaTween(0, 1, this.door, () =>
        this.handle?.startCrazySpin(1, () => this.init())
      );
    else this.init();
  }

  async unload() {
    if (this.handle) this.handle.unload();
  }

  onResize() {
    if (this.bg) recenterSpritesFullScreen(this.bg);
  }

  update() {
    if (this.keypad)
      this.keypad.text =
        this.isReady && this.timer ? this.timer?.getTime() : "";
  }

  onHandleSegmentClick(direction: number) {
    if (
      this.combinationManager?.checkSequence(
        direction,
        () => this.handle?.startCrazySpin(1, () => this.onCombinationFail()),
        () => this.handle?.startCrazySpin(-1, () => this.onCombinationSuccess())
      )
    ) {
      this.handle?.forceStop();
    }
  }

  onCombinationFail() {
    this.init();
  }

  onCombinationSuccess() {
    sound.play("open");
    alphaTween(1, 0, this.door, () => this.sceneManager.switchScene("End"));
  }
}
