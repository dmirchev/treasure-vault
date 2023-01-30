import { Sprite, Text } from "pixi.js";

export default class KeypadDisplayText extends Text {
  constructor(text: string, parent: Sprite) {
    super(text, {
      fontFamily: "Verdana",
      fontSize: 50,
      fill: "red",
    });

    this.resolution = 2;

    this.setParent(parent);

    this.anchor.set(0.5);
    this.x = -(this.parent as Sprite).texture.width * 0.196;
    this.y = -(this.parent as Sprite).texture.height * 0.05;
  }
}
