import { DllEvtEnum } from "../enums";
import { DllService } from "./dll.service";
import { Controller, FormatAllMethods, IpcHandle } from "$/plugin/eioc/decorator";
@Controller()
@FormatAllMethods()
export class DllController {
  constructor(private readonly dllService: DllService) {}
  @IpcHandle(DllEvtEnum.DLL_MSG_BOX)
  msgBox() {
    return this.dllService.openMsgBox();
  }
}
