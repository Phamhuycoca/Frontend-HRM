import { createRoot } from "react-dom/client";
import "./index.css";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, App as AppGlobal } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Routers from "./routers/Routers";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { GlobalAlert, GlobalConfirm, GlobalLoading, GlobalMessage } from "@/component/ui/Global";
createRoot(document.getElementById("root")!).render(
  <StyleProvider hashPriority="high">
    <ConfigProvider theme={{ cssVar: { key: "app" }, hashed: false }}>
      <AppGlobal>
        <Provider store={store}>
          <PersistGate loading={<GlobalLoading />} persistor={persistor}>
            <Router>
              <Routes>
                {Routers.map((route) => {
                  if (route.children) {
                    return (
                      <Route key={route.path} path={route.path} element={<route.component />}>
                        {route.children.map((childRoute) => (
                          <Route
                            key={childRoute.path}
                            path={childRoute.path}
                            element={<childRoute.component />}
                          />
                        ))}
                      </Route>
                    );
                  }
                  return <Route key={route.path} path={route.path} element={<route.component />} />;
                })}
              </Routes>
              <GlobalMessage />
              <GlobalAlert />
              <GlobalConfirm />
            </Router>
          </PersistGate>
        </Provider>
      </AppGlobal>
    </ConfigProvider>
  </StyleProvider>,
);
