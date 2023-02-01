import { Point, utils } from "pixi.js";
export default class Mouse extends utils.EventEmitter {
  private static instance: Mouse;

  static states = {
    ACTION: "ACTION",
  };

  static actions = {
    PRIMARY: "PRIMARY",
  } as const;

  static actionKeyMap = {
    [Mouse.actions.PRIMARY]: 0,
  } as const;

  static allKeys = Object.values(Mouse.actionKeyMap);

  static keyActionMap = Object.entries(Mouse.actionKeyMap).reduce(
    (acc, [key, action]) => {
      acc[action] = key as keyof typeof Mouse.actions;

      return acc;
    },
    {} as Record<string, keyof typeof Mouse.actionKeyMap>
  );

  private keyMap = new Map<number, boolean>();

  private constructor() {
    super();

    this.listenToKeyEvents();
  }

  private listenToKeyEvents() {
    document.addEventListener("mousedown", (e) =>
      this.onMousePress(e.button, new Point(e.x, e.y))
    );
    document.addEventListener("mousemove", (e) =>
      this.onMouseDrag(e.button, new Point(e.x, e.y))
    );
    document.addEventListener("mouseup", (e) =>
      this.onMouseRelease(e.button, new Point(e.x, e.y))
    );
  }

  public static getInstance(): Mouse {
    if (!Mouse.instance) {
      Mouse.instance = new Mouse();
    }

    return Mouse.instance;
  }

  public getAction(action: keyof typeof Mouse.actions): boolean {
    return this.isKeyDown(Mouse.actionKeyMap[action]);
  }

  public onAction(
    callback: (e: {
      action: keyof typeof Mouse.actions;
      buttonState: "pressed" | "drag" | "released";
      position: Point;
    }) => void
  ): void {
    this.on(Mouse.states.ACTION, callback);
  }

  public offAction() {
    this.removeAllListeners();
  }

  private onMousePress(button: number, position: Point): void {
    if (this.isKeyDown(button) || !(button in Mouse.keyActionMap)) return;

    this.keyMap.set(button, true);

    this.emit(Mouse.states.ACTION, {
      action: Mouse.keyActionMap[button],
      buttonState: "pressed",
      position: position,
    });
  }

  private onMouseDrag(button: number, position: Point): void {
    if (!this.isKeyDown(button) || !(button in Mouse.keyActionMap)) return;

    this.emit(Mouse.states.ACTION, {
      action: Mouse.keyActionMap[button],
      buttonState: "drag",
      position: position,
    });
  }

  private onMouseRelease(button: number, position: Point): void {
    if (!(button in Mouse.keyActionMap)) return;

    this.keyMap.set(button, false);

    this.emit(Mouse.states.ACTION, {
      action: Mouse.keyActionMap[button],
      buttonState: "released",
      position: position,
    });
  }

  public isKeyDown(key: number): boolean {
    return this.keyMap.get(key) ?? false;
  }
}
