import koffi from "koffi";
import { Injectable } from "$/plugin/eioc/decorator";
@Injectable()
export class DllService {
  protected lib: koffi.IKoffiLib;
  constructor() {
    this.lib = koffi.load("user32.dll");
  }
  openMsgBox() {
    // Declare constants
    // const MB_OK = 0x0; // remove unused variable
    // const IDOK = 1;
    // const IDNO = 7;
    // Find functions
    const MB_YESNO = 0x4;
    const MB_ICONQUESTION = 0x20;
    const MB_ICONINFORMATION = 0x40;
    const IDYES = 6;
    const MessageBoxA = this.lib.func("__stdcall", "MessageBoxA", "int", ["void *", "str", "str", "uint"]);
    const MessageBoxW = this.lib.func("__stdcall", "MessageBoxW", "int", ["void *", "str16", "str16", "uint"]);
    // eslint-disable-next-line no-bitwise
    const ret = MessageBoxA(null, "Do you want another message box?", "Koffi", MB_YESNO | MB_ICONQUESTION);
    if (ret === IDYES) MessageBoxW(null, "Hello World!", "Koffi", MB_ICONINFORMATION);
  }
  add(arg1: number | `${number}`, arg2: number | `${number}`) {
    console.log("function add----------------------");
    console.log("inject data", typeof arg1, arg1, typeof arg2, arg2);
    console.log("function add---------------------- end");
    return Number(arg1) + Number(arg2);
  }
  printObject(obj: { [key: string]: string | number }) {
    console.log("function printObject ----------------------");
    console.log("function printObject", obj);
    console.log("keys:", Object.keys(obj));
    console.log("function printObject ---------------------- end");
    return "";
  }
}
