import "reflect-metadata";
import { CostomMetaDataEnum } from "./enums";

import type { Construct, ModulePropsType } from "./types";

export function Controller(rootPath?: string) {
  return (target, _context?: string | symbol): void => {
    if (rootPath) {
      Reflect.defineMetadata(CostomMetaDataEnum.CONTROL, rootPath, target);
    }
  };
}
export function Injectable(name?: string): ClassDecorator {
  return (target): void => {
    Reflect.defineMetadata(CostomMetaDataEnum.INJECTABLE, "class", target);
    if (name) {
      Reflect.defineMetadata(CostomMetaDataEnum.SERVICE, name, target);
    }
  };
}
export function IpcInvoke(eventName: string) {
  return (target, propertyName): void => {
    Reflect.defineMetadata(CostomMetaDataEnum.IPC_INVOKE, eventName, <Object>target, propertyName);
  };
}
export function IpcHandle(eventName: string) {
  if (!eventName) throw new Error("ipc handle name is required");
  return (target, propertyName): void => {
    Reflect.defineMetadata(CostomMetaDataEnum.IPC_HANDLE, eventName, <Object>target, propertyName);
  };
}
export function Module(metadata: ModulePropsType) {
  return <T extends Construct>(target: T, _context?: string | symbol): void => {
    for (const key in metadata) {
      if (Object.hasOwn(metadata, key)) {
        const prop = metadata[key as keyof typeof metadata];
        Array.isArray(prop) && Reflect.defineMetadata(key, prop, target);
      }
    }
  };
}
type ResType<T = any> = {
  code: number;
  data: any;
  msg?: string;
  other?: T;
};
export function FormatResRule(res: ResType | string) {
  if (typeof res === "string" || res === undefined) {
    return {
      code: 200,
      data: res
    };
  }
  const { code = 200, data = {}, msg = "" } = res;
  return {
    code,
    data,
    msg
  };
}

export function FormatAllMethods(formatRule = FormatResRule) {
  return (target: Function) => {
    const funcs = Object.getOwnPropertyNames(target.prototype).filter(name => name !== "constructor" && typeof target.prototype[name] === "function");
    funcs.forEach((fnName: string) => {
      const descriptor = Object.getOwnPropertyDescriptor(target.prototype, fnName);
      if (descriptor) {
        const originalMethod = descriptor.value;
        // eslint-disable-next-line func-names
        descriptor.value = function (...args: any[]) {
          try {
            const result = originalMethod.apply(this, args);
            return formatRule(result);
          } catch (error: any) {
            console.error(`Error in method ${fnName}:`, error);
            return formatRule({ code: 500, data: {}, msg: error?.message || error });
          }
        };
        Object.defineProperty(target.prototype, fnName, descriptor);
      }
    });
  };
}
