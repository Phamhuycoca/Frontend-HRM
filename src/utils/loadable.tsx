import { GlobalLoading } from "@/component/ui/Global";
import React, { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";

type ImportFunc<T extends ComponentType<any>> = () => Promise<{
  default: T;
}>;

const loadable = <T extends ComponentType<any>>(importFunc: ImportFunc<T>) => {
  const LazyComponent: LazyExoticComponent<T> = lazy(importFunc);
  const LoadableComponent = (props: React.ComponentProps<T>) => (
    <Suspense fallback={<GlobalLoading />}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return LoadableComponent;
};

export { loadable };
