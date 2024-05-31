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
  @IpcHandle(DllEvtEnum.DLL_TRANSPORT_DATA)
  basicData(arg1, arg2) {
    return this.dllService.add(arg1, arg2);
  }
  @IpcHandle(DllEvtEnum.DLL_TRANSPORT_DATA_OBJECT)
  objData(obj) {
    return this.dllService.printObject(obj);
  }
}
