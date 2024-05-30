import { app, ipcMain } from "electron";
import { BaseMetadataEnum, CostomMetaDataEnum } from "./enums";
import type { Construct, Options } from "./types";

/** Create and initialize Einf app */
export async function createEioc({ controllers }: Options) {
  const ExistInjectableMap = new Map<string, any>();

  await app.whenReady();
  // init controllers
  for (const ctrl of controllers) {
    const controller = factory(ctrl);
    const proto = controller?.prototype || Object.getPrototypeOf(controller); // controller.prototype
    const funcs = Object.getOwnPropertyNames(proto).filter(item => typeof controller[item] === "function" && item !== "constructor");

    funcs.forEach((fnName: string) => {
      if (Reflect.getMetadata(CostomMetaDataEnum.IPC_HANDLE, proto, fnName)) {
        const event = Reflect.getMetadata(CostomMetaDataEnum.IPC_HANDLE, proto, fnName);
        ipcMain.handle(event, async (e, ...args) => {
          try {
            // eslint-disable-next-line no-useless-call
            const res = await controller[fnName].apply(controller, [...args, e]);
            return res;
          } catch (error: any) {
            throw new Error(error?.message ?? error);
          }
        });
      }
    });
  }

  function factory<T>(constructor: Construct<T>): T {
    const paramtypes = Reflect.getMetadata(BaseMetadataEnum.PARAMTYPES_METADATA, constructor);
    let services: any[] = [];
    if (paramtypes) {
      services = paramtypes?.map((service: any, index: number) => {
        const inject = Reflect.getOwnMetadata(CostomMetaDataEnum.INJECTABLE, service);

        if (!inject) {
          throw new Error(`${constructor.name}'s parameter [${index}] is not injectable or is a circular dependency`);
        }
        const { name } = service;
        let item;
        if (ExistInjectableMap.has(name)) {
          item = ExistInjectableMap.get(name);
        } else {
          item = factory(service); // instance parameter
          ExistInjectableMap.set(name, item);
        }
        return item;
      });
    }
    return new constructor(...services);
  }
}
