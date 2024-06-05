import { IpcEventEnum } from "@sa/enums";
import { Controller, IpcHandle } from "@sa/eioc";
import { WindowService } from "./window.service";

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
