import { IpcEventEnum } from "../enums";
import { WindowService } from "./window.service";
import { Controller, IpcHandle } from "$/plugin/eioc/decorator";

@Controller()
export class WindowController {
  constructor(private readonly windowService: WindowService) {}
  @IpcHandle(IpcEventEnum.WINDOW_MAX)
  winMax(e) {
    return this.windowService.setWindowMax(e);
  }
  @IpcHandle(IpcEventEnum.WINDOW_MIN)
  winMin(e) {
    return this.windowService.setWindowMin(e);
  }
  @IpcHandle(IpcEventEnum.WINDOW_CLOSE)
  winClose(e) {
    return this.windowService.setWindowClose(e);
  }
}
