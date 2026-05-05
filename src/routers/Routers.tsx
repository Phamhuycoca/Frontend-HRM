import type { IRouter } from "@/data/Router";
import { loadable } from "@/utils/loadable";

const Routers: IRouter[] = [
  {
    path: "/auth-callback",
    component: loadable(() => import("@/pages/AuthCallback")),
  },
  {
    path: "/",
    component: loadable(() => import("@/component/layout/Admin")),
  },
];
export default Routers;
