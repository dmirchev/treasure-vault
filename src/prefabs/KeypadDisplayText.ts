import { Sprite, Text } from "pixi.js";
import { recenterSpriteInParent } from "../utils/misc";

export default class KeypadDisplayText extends Text {
  constructor(text: string, parent: Sprite) {
    super(text, {
      fontFamily: "Verdana",
      fontSize: 50,
      fill: "red",
    });

    this.resolution = 2;

    this.setParent(parent);

    recenterSpriteInParent(this, -0.196, -0.05);
  }
}
