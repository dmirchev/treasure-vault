import config from "../config";
import ParallaxBackground from "../prefabs/ParallaxBackground";
import { Player } from "../prefabs/Player";
import Scene from "../core/Scene";
import { Sprite } from "pixi.js";
import KeypadDisplayText from "../prefabs/KeypadDisplayText";
import { centerObjects, recenterSpriteInParent, recenterSpritesFullScreen } from "../utils/misc";
import { Debug } from "../utils/debug";
import { Handle } from "../prefabs/Handle";

export default class Game extends Scene {
  name = "Game";

  private player: Player | undefined;
  private background: ParallaxBackground | undefined;

  private bg: Sprite | undefined;
  private keypad: KeypadDisplayText | undefined;
  private handle: Handle | undefined;

  load() {
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

    const door = Sprite.from("door");
    this.bg.addChild(door);
    recenterSpriteInParent(door, 0.009, -0.012);

    this.handle = new Handle();
    door.addChild(this.handle);
    recenterSpriteInParent(this.handle, -0.04, -0.01);
  }

  onResize(width: number, height: number) {
    /* if (this.player) {
      this.player.x = width / 2;
      this.player.y = height - this.player.height / 3;
    }

    if (this.background) {
      this.background.resize(width, height);
    } */

    if (this.bg) recenterSpritesFullScreen(this.bg);
  }
}
