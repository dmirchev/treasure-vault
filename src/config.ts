import { EmitterConfigV3 } from "@pixi/particle-emitter";

type Config = {
  emitterConfig: EmitterConfigV3;
};

export default {
  emitterConfig: {
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
  },
} as Config;
