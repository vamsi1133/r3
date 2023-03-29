import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Cart = React.lazy(() => import("./pages/Cart"));

const CustomRouter = (props) => {
  const routes = [
    {
      element: <Home {...props} />,
      path: "/",
    },
    {
      element: <Cart discount={10} {...props} />,
      path: "/cart",
    },
    {
      element: <Login {...props} />,
      path: "/login",
    },
  ];
  return (
    <>
      <Router>
        <Routes>
          {routes.map((val) => {
            return (
              <Route
                element={
                  <Suspense fallback={<div>....Loading</div>}>
                    {val.element}
                  </Suspense>
                }
                path={val.path}
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
};

export default CustomRouter;
