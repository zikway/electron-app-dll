import { contextBridge, ipcRenderer } from "electron";

// Custom APIs for renderer
const api = {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args));
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  }
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("ipc", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.ipc = api;
}
