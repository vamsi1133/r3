import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";

const CustomRouter = () => {
  const routes = [
    {
      element: <Home />,
      path: "/",
    },
    {
      element: <Cart discount={10} />,
      path: "/cart",
    },
    {
      element: <Login />,
      path: "/login",
    },
  ];
  return (
    <>
      <Router>
        <Routes>
          {routes.map((val) => {
            return <Route element={val.element} path={val.path} />;
          })}
        </Routes>
      </Router>
    </>
  );
};

export default CustomRouter;
