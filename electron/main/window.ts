import { join } from "node:path";
import os from "node:os";
import { BrowserWindow, app, screen, shell } from "electron";
import type { BrowserWindowConstructorOptions } from "electron";
import { is, optimizer } from "@electron-toolkit/utils";

process.env.APP_ROOT = join(__dirname, "../..");

export const MAIN_DIST = join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = join(process.env.APP_ROOT, "dist");
export const VITE_DEV_SERVER_URL = process.env.ELECTRON_RENDERER_URL as string;

type winPropsName = "title" | "width" | "height" | "modal";

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? join(process.env.APP_ROOT, "../", "public") : RENDERER_DIST;
const preload = join(__dirname, "../preload/preload.js");
const indexHtml = join(RENDERER_DIST, "index.html");
const icon = join(process.env.VITE_PUBLIC, "icons", "logo.png");

export function createWindow(options: Pick<BrowserWindowConstructorOptions, winPropsName> = {}) {
  // Create the browser window
  const displayWorkAreaSize = screen.getAllDisplays()[0].workArea;
  const defaultOpts: BrowserWindowConstructorOptions = {
    width: Number.parseInt(`${displayWorkAreaSize.width * 0.85}`, 10),
    height: Number.parseInt(`${displayWorkAreaSize.height * 0.85}`, 10),
    icon,
    frame: false,
    webPreferences: {
      preload
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    }
  };
  const win = new BrowserWindow({ ...defaultOpts, ...options });

  win.on("ready-to-show", () => {
    win.show();
  });

  win.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(indexHtml);
  }
}
export function electronAppInit(options?: { afterCreateWindow?: boolean }) {
  // Disable GPU Acceleration for Windows 7
  if (os.release().startsWith("6.1")) app.disableHardwareAcceleration();

  // Set application name for Windows 10+ notifications
  if (process.platform === "win32") app.setAppUserModelId(app.getName());

  if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
  }

  // This method will be called
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(() => {
    // Set app user model id for windows
    // electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on("browser-window-created", (_, window) => {
      optimizer.watchWindowShortcuts(window);
    });

    !options?.afterCreateWindow && createWindow();
    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  // In this file you can include the rest of your app"s specific main process
  // code. You can also put them in separate files and require them here.
}
