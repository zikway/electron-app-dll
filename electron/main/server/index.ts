import { createEioc } from "../../plugin/eioc";
import { AppController } from "./app.control";
import { DllController } from "./dll/dll.control";
import { WindowController } from "./window/window.control";
export async function setupEiocInstance() {
  await createEioc({
    controllers: [AppController, WindowController, DllController]
  });
}
