import { DisplayObject, Point } from "pixi.js";

export function angleBetweenVectors(vector1: Point, vector2: Point) {
  return Math.acos(
    vector1.dot(vector2) / (vector1.magnitude() * vector2.magnitude())
  );
}

export function calculateVector(angle: number) {
  return new Point(Math.cos(angle), Math.sin(angle));
}

export function calculateAngle(vector: Point): number {
  return Math.atan2(vector.y, vector.x);
}

export function inverseTransform(vector: Point, parent: DisplayObject): Point {
  return vector.subtract(parent.toGlobal(parent.position));
}

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
