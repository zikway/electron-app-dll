import { Injectable } from "@sa/eioc";
@Injectable()
export class AppService {
  ping() {
    console.log("ipcmain ping");
  }
}
