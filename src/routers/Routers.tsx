import type { IRouter } from "@/data/Router";
import { loadable } from "@/utils/loadable";

const Routers: IRouter[] = [
  {
    path: "/",
    component: loadable(() => import("@/pages/Login")),
  },
];
export default Routers;
