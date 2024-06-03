import { IpcEventEnum } from "@sa/enums";
import { Controller, IpcHandle } from "../../plugin/eioc/decorator";
import { AppService } from "./app.service";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @IpcHandle(IpcEventEnum.PING)
  ping() {
    return this.appService.ping();
  }
}
