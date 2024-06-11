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
  @IpcHandle(DllEvtEnum.DLL_TRANSPORT_DATA)
  basicData(arg1, arg2) {
    return this.dllService.add(arg1, arg2);
  }
  @IpcHandle(DllEvtEnum.DLL_TRANSPORT_DATA_OBJECT)
  objData(obj) {
    return this.dllService.printObject(obj);
  }
  @IpcHandle(DllEvtEnum.DLL_DEMO)
  demo(data) {
    return this.dllService.demo(data);
  }
}
