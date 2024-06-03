import { DllEvtEnum } from "@sa/enums";
import { Controller, FormatAllMethods, IpcHandle } from "@sa/eioc";
import { DllService } from "./dll.service";
@Controller()
@FormatAllMethods()
export class DllController {
  constructor(private readonly dllService: DllService) {}
  @IpcHandle(DllEvtEnum.DLL_MSG_BOX)
  msgBox() {
    return this.dllService.openMsgBox();
  }
}
