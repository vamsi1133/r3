import { Button } from "@mui/material";
import React from "react";

const Logout = (Component) => {
  return (props) => {
    const logoutHandler = () => {
      localStorage.clear();
      window.location.replace("http://localhost:3000/login");
    };
    return (
      <>
        <Button onClick={logoutHandler}>Logout</Button>
        <Component {...props} />;
      </>
    );
  };
};

export default Logout;
