import type { IRouter } from "@/data/Router";
import { loadable } from "@/utils/loadable";

const Routers: IRouter[] = [
  {
    path: "/",
    component: loadable(() => import("@/pages/Login")),
  },
  {
    path: "/admin",
    component: loadable(() => import("@/component/layout/Admin")),
  },
];
export default Routers;
