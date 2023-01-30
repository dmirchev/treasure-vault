import SceneManager from "./core/SceneManager";

const sceneManager = new SceneManager();

await sceneManager.switchScene("Loading");
await sceneManager.switchScene("Game");

export async function switchScene(sceneName: string) {
  return await sceneManager.switchScene(sceneName);
}
