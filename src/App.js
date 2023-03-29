import React, { useState } from "react";
import "./App.css";
import CustomRouter from "./CustomRouter";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CustomRouter />
      </div>
    </Provider>
  );
}

export default App;
