import { DisplayObject, Sprite } from "pixi.js";

export function centerObjects(...toCenter: DisplayObject[]) {
  const center = (obj: DisplayObject) => {
    obj.x = window.innerWidth / 2;
    obj.y = window.innerHeight / 2;

    if (obj instanceof Sprite) {
      obj.anchor.set(0.5);
    }
  };

  toCenter.forEach(center);
}

export function recenterSpritesFullScreen(...sprites: Sprite[]) {
  const windowAspectRatio = window.innerWidth / window.innerHeight;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const recenter = (sprite: Sprite) => {
    sprite.x = centerX;
    sprite.y = centerY;

    const spriteAspectRatio = sprite.width / sprite.height;

    if (windowAspectRatio > spriteAspectRatio) {
      sprite.height = window.innerHeight;
      sprite.width = sprite.height * spriteAspectRatio;
    } else {
      sprite.width = window.innerWidth;
      sprite.height = sprite.width / spriteAspectRatio;
    }
  };

  sprites.forEach(recenter);
}

export function wait(seconds: number) {
  return new Promise<void>((res) => setTimeout(res, seconds * 1000));
}

export async function after(
  seconds: number,
  callback: (...args: unknown[]) => unknown
) {
  await wait(seconds);
  return callback();
}

export function getEntries<T extends object>(obj: T) {
  return Object.entries(obj) as Entries<T>;
}
