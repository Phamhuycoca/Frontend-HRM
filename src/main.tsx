import { createRoot } from "react-dom/client";
import "./index.css";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Routers from "./routers/Routers";
createRoot(document.getElementById("root")!).render(
  <StyleProvider hashPriority="high">
    <ConfigProvider theme={{ cssVar: { key: "app" }, hashed: false }}>
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
      </Router>
    </ConfigProvider>
  </StyleProvider>,
);
