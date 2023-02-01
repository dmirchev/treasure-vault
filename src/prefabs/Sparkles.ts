import { Emitter, EmitterConfigV3 } from "@pixi/particle-emitter";
import { Container, Texture } from "pixi.js";

export class Sparkles extends Container {
  private emitter: Emitter | undefined;

  constructor(
    parent: Container,
    textureName: string,
    protected config: EmitterConfigV3
  ) {
    super();

    const emitterConfig = this.config;
    emitterConfig.behaviors.push({
      type: "textureSingle",
      config: {
        texture: Texture.from(textureName),
      },
    });

    this.emitter = new Emitter(parent, emitterConfig);

    this.emitter.emit = true;
  }

  update(delta: number) {
    if (this.emitter) this.emitter.update(delta);
  }
}
