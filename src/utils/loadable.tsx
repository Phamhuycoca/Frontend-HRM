import React, { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import { Loading } from "@/component/ui";

type ImportFunc<T extends ComponentType<any>> = () => Promise<{
  default: T;
}>;

const loadable = <T extends ComponentType<any>>(importFunc: ImportFunc<T>) => {
  const LazyComponent: LazyExoticComponent<T> = lazy(importFunc);
  const LoadableComponent = (props: React.ComponentProps<T>) => (
    <Suspense fallback={<Loading />}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return LoadableComponent;
};

export { loadable };
