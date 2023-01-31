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
