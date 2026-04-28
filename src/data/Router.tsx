import type { ComponentType } from "react";

export interface IRouter {
  path: string;
  component: ComponentType<any>;
  private?: boolean | false;
  children?: IRouter[];
}
