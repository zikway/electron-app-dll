import { BrowserWindow } from "electron";
import { Injectable } from "$/plugin/eioc/decorator";

@Injectable()
export class WindowService {
  setWindowMin(events: Electron.IpcMainEvent) {
    const win = BrowserWindow.fromWebContents(events.sender)!;
    win.minimize();
  }
  setWindowMax(events: Electron.IpcMainEvent) {
    const win = BrowserWindow.fromWebContents(events.sender)!;
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  }
  setWindowClose(events: Electron.IpcMainEvent) {
    events.preventDefault();
    const win = BrowserWindow.fromWebContents(events.sender)!;
    win.close();
  }
}
