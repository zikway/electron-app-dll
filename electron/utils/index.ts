import { join } from "node:path";
import { is } from "@electron-toolkit/utils";

export function getExtraResourcesPath(...paths: string[]) {
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    return join(process.env.APP_ROOT!, "..", "extraResources", ...paths);
  }
  return join(__dirname, "..", "extraResources", ...paths);
}
