export type Construct<T = any> = new (...args: Array<any>) => T;
export type ControllerClass = Construct;
export type InjectableClass = Construct;
export interface InjectableOpts {
  name: string;
  inject: unknown;
}

export type Options = {
  /** Automatically initialized controller */
  controllers: ControllerClass[];
  /** Custom injectable items */
  injects?: InjectableOpts[];
};
export type ModulePropsType = {
  /** Automatically initialized controller */
  controllers?: ControllerClass[];
  /** Automatically initialized service */
  providers?: InjectableClass[];
  // injects?: any[]
  // imports?: any[]
};
