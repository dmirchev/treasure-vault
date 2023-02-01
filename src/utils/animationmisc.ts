import gsap from "gsap";
import { Sprite } from "pixi.js";

export function alphaTween(
  startAlpha: number,
  endAlpha: number,
  sprite?: Sprite,
  onComplete?: (() => void) | undefined
) {
  if (!sprite) return;
  sprite.alpha = startAlpha;

  gsap.to(sprite, {
    alpha: endAlpha,
    ease: "power1.in",
    onComplete: () => {
      if (onComplete) onComplete();
    },
  });
}

export function alphaTweenSine(sprite?: Sprite) {
  if (!sprite) return;
  sprite.alpha = 1;

  gsap.to(sprite, {
    alpha: 0,
    ease: "power1.in",
    duration: 0.75,
    repeat: -1,
    yoyo: true,
  });
}

export function rotationTween(
  startRotation: number,
  endRotation: number,
  duration: number,
  sprite?: Sprite,
  onComplete?: (() => void) | undefined
) {
  if (!sprite) return;
  sprite.rotation = startRotation;

  gsap.to(sprite, {
    rotation: endRotation,
    duration: duration,
    ease: "power1.out",
    onComplete: () => {
      if (onComplete) onComplete();
    },
  });
}
