import { Injectable } from "../../plugin/eioc/decorator";
@Injectable()
export class AppService {
  ping() {
    console.log("ipcmain ping");
  }
}
