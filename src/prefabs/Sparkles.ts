import { Emitter, EmitterConfigV3 } from "@pixi/particle-emitter";
import { Container, Texture, Ticker } from "pixi.js";
import { Debug } from "../utils/debug";

export class Sparkles extends Container {
  private emitter: Emitter | undefined;

  static emitterConfig: EmitterConfigV3 = {
    lifetime: {
      min: 40,
      max: 100,
    },
    frequency: 10,
    spawnChance: 1,
    particlesPerWave: 1,
    emitterLifetime: -1,
    maxParticles: 3,
    pos: {
      x: 0,
      y: 0,
    },
    addAtBack: false,
    behaviors: [
      {
        type: "alpha",
        config: {
          alpha: {
            list: [
              {
                value: 1,
                time: 0,
              },
              {
                value: 0,
                time: 1,
              },
            ],
          },
        },
      },
      {
        type: "scaleStatic",
        config: {
          min: 0.5,
          max: 1,
        },
      },
      {
        type: "colorStatic",
        config: {
          color: "#ffffff",
        },
      },
      {
        type: "moveSpeedStatic",
        config: {
          min: 0,
          max: 0,
        },
      },
      {
        type: "rotation",
        config: {
          minStart: 0,
          maxStart: 360,
          minSpeed: 0,
          maxSpeed: 1,
          accel: 0.1,
        },
      },
      {
        type: "spawnShape",
        config: {
          type: "rect",
          data: {
            x: -350,
            y: 0,
            w: 700,
            h: 500,
          },
        },
      },
    ],
  };

  constructor(parent: Container, textureName: string) {
    super();

    const emitterConfig = Sparkles.emitterConfig;
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
